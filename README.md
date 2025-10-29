# Pay Product Page

## Raising a PR

- Before raising a PR, you need to run prettier (`npm run format`), then add all files to your commit
- PR builds needs to be approved in percy (https://percy.io) if they contain any changes under the src dir (performance data update does not require percy approval)

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

Releases are created when changes are merged into the `main` branch.

The product pages are then deployed to GitHub Pages automatically via GitHub Actions. Page contents are cached for roughly 30 minutes so your changes might not be viewable immediately.

[View the product pages](https://payments.service.gov.uk/)

## Licence

[MIT Licence](LICENCE)

## Vulnerability Disclosure

GOV.UK Pay aims to stay secure for everyone. If you are a security researcher and have discovered a security vulnerability in this code, we appreciate your help in disclosing it to us in a responsible manner. Please refer to our [vulnerability disclosure policy](https://www.gov.uk/help/report-vulnerability) and our [security.txt](https://vdp.cabinetoffice.gov.uk/.well-known/security.txt) file for details.
