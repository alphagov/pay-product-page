# Dispatches commands to other msl_(command|option) functions
githubrelease () ( dispatch githubrelease "${@:-}" )

# Displays help
githubrelease_command_help ()
{
	cat <<-HELP
'github-release' creates a release for the 'pay-product-page' project and publishes 
on GitHub. Following conventions, it creates a new GitHub release which gets tied to 
a new tag created on master. The static version of the product page is generated, 
bundled and attached to the release.

Usage:
  github-release [option_list...] 
  github-release help, -h, --help Displays help for command.

Options:
  --version          The version

Examples:
  github-release --version=v1.0.0 publish

HELP
}

# Option handlers
githubrelease_option_help        () ( githubrelease_command_help )
githubrelease_option_h           () ( githubrelease_command_help )

githubrelease_option_version      () ( githubrelease_option_version="$1"; shift; dispatch githubrelease "${@:-}" )

githubrelease_      () ( githubrelease_command_help; return 1 )
githubrelease_call_ () ( echo "Call '$*' invalid. Try 'github-release --help'"; return 1 )
