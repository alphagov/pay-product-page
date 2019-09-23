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

## Releasing the Product Pages

There is now a semi-automated process for getting a new build of the product pages into pay-frontend, orchestrated by GitHub Actions.
When a change is merged to master, the following happens:

- The Action defined in `.github/workflows/release.yml` will automatically build and publish a new release
- The Action sends a trigger to pay-frontend
- An Action defined in pay-frontend under `.github/workflows/product-page.yml` acts on this trigger and bumps the `pay-product-page` version in `package.json`
- The Action then raises a PR in pay-frontend with the changes to `package.json` and `package-lock.json`
