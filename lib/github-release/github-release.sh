# Global option defaults
githubrelease_option_authkey=${GITHUB_TOKEN:-}
githubrelease_option_version=""

# Location of pay-scripts project relative to this script location
githubrelease_pay_scripts_path="$(cd "$(dirname "$0")/..";pwd)"

githubrelease_prerequisites ()
{
    if ! hash curl 2>/dev/null; then
        critical "github-release" "curl cannot be found. Make sure curl is installed correctly on your machine: https://curl.haxx.se/"
        exit 1
    fi    

    if [ -z "$githubrelease_option_authkey" ]; then
        critical "github-release" "Make sure the API Key is provided as an env variable GITHUB_TOKEN"
        exit 1
    fi

    if [ -z "$githubrelease_option_version" ]; then
        critical "github-release" "Make sure the release version has been specified with --version"
        exit 1
    fi    
}

githubrelease_generate_package_json_file ()
{
cat <<EOF > ./package.json
{
  "name": "pay-product-page",
  "version": "$githubrelease_option_version"
}
EOF
}

githubrelease_new_release ()
{
    data="{\"tag_name\": \"$githubrelease_option_version\",\"target_commitish\": \"master\",\"name\": \"$githubrelease_option_version\",\"body\": \"Release of version $githubrelease_option_version\",\"draft\": false,\"prerelease\": false}"
    response=$(curl -H "Authorization:token $githubrelease_option_authkey" --data "$data" https://api.github.com/repos/alphagov/pay-product-page/releases)

    inf "github-release" "Release creation: $response"

    upload_url="$(echo "$response" | grep \"upload_url\" || echo )"
    echo $upload_url | cut -d \" -f 4 | cut -d { -f 1
}

githubrelease_attach_artifact ()
{
    upload_url=$1
    curl -X POST -H "Authorization:token $githubrelease_option_authkey" -H "Content-Type:application/x-gzip" --data-binary "@pay-product-page-$githubrelease_option_version.tgz" "$upload_url?name=pay-product-page-$githubrelease_option_version.tgz"
}

githubrelease_command_publish ()
{
    githubrelease_prerequisites

    test ! -d build && bundle exec middleman build

    cd build
    githubrelease_generate_package_json_file
    tar -cvzf pay-product-page-$githubrelease_option_version.tgz .
                               
    upload_url="$(githubrelease_new_release)"
    
    if [ -z "$upload_url" ]; then
        critical "github-release" "Release creation failed."
        exit 1
    fi
    
    githubrelease_attach_artifact "$upload_url"
}
