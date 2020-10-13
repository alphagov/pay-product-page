# Pay Product Page

## Running Locally

- `bundle install` to install middleman and its dependencies
- `npm install` to install the frontend dependencies
- `bundle exec middleman server` - to start middleman's built in server
- `open http://localhost:4567` - to open the example in your browser

## Building a Static Copy of the Site

- `bundle install`
- `npm install`
- `bundle exec middleman build`

Check the `build` directory for the output.

## Components

Look at the CSS for the individual components for usage examples and notes.

- [Breadcrumbs](source/stylesheets/modules/_breadcrumbs.scss)
- [Content Section](source/stylesheets/modules/_content-section.scss)
- [Full Width Form](source/stylesheets/modules/_full-width-form.scss)
- [GOV.UK Logo](source/stylesheets/modules/_govuk-logo.scss)
- [Header](source/stylesheets/modules/_header.scss)
- [Hero 'Alternative Action'](source/stylesheets/modules/_hero-alternative-action.scss)
- [Hero Button](source/stylesheets/modules/_hero-button.scss)
- [Masthead](source/stylesheets/modules/_masthead.scss)
- [Phase Banner](source/stylesheets/modules/_phase-banner.scss)
- [Related Items](source/stylesheets/modules/_related-items.scss)
- [Skip Link](source/stylesheets/modules/_skip-link.scss)
- [Sub Navigation](source/stylesheets/modules/_sub-navigation.scss)

## Releasing a Static Copy of the Site

Use the command line script `github-release` to build an artifact containing the generated static site which is published as a [GitHub release](https://github.com/alphagov/pay-product-page/releases).

1. Checkout and `pull` the `master` branch
2. Follow the instructions above under [Building a static copy of the site](#building-a-static-copy-of-the-site)
3. Generate a [personal access](https://github.com/settings/tokens) token in GitHub. The token should have the `repo` scope.
4. Run the following:

```GITHUB_TOKEN=xxx bin/github-release --version 1.0.1 publish```

>- `GITHUB_TOKEN` is the personal access token you generated
>- the `--version` argument specifies the version of the new release (pick something sensible based on the previous releases)

To deploy the product page, update the `pay-product-page` dependency in [`pay-frontend`](https://github.com/alphagov/pay-frontend/blob/master/package.json) to point to the GitHub URL for the `.tgz` file associated with the [GitHub release](https://github.com/alphagov/pay-product-page/releases). Then deploy `pay-frontend`.

## Licence

[MIT Licence](LICENCE)

## Responsible Disclosure

GOV.UK Pay aims to stay secure for everyone. If you are a security researcher and have discovered a security vulnerability in this code, we appreciate your help in disclosing it to us in a responsible manner. We will give appropriate credit to those reporting confirmed issues. Please e-mail gds-team-pay-security@digital.cabinet-office.gov.uk with details of any issue you find, we aim to reply quickly.
