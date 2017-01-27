# Pay Product Page

## Running Locally

- `bundle install`
- `bower install`
- `bundle exec middleman server`
- `open http://localhost:4567`

## Building a Static Copy of the Site

- `bundle install`
- `bower install`
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

The command line script `github-release` allows you to easily build an artifact containing the generated static site and publish it on GitHub in a format that makes it suitable for use as a Node.js dependency.

Using the GitHub API, the script creates a new release from `master` with an associated tag. On your local machine, it then builds a static version of the site (using `middleman`) from your working copy, adds a `package.json` file (which makes it a Node.js module) inside the resulting `build` directory, `tar`s and `gzip`s the `build` directory, then attaches the gzipped tarball as a binary to the release in GitHub, where it appears alongside the source code downloads on the releases page. This artifact is available over HTTPS and can be used as a dependency in a Node.js project.

In order to run the script, you need to declare an environment variable called `GITHUB_TOKEN` containing your GitHub authentication token:

`GITHUB_TOKEN=xxx`

Then you can run the script:

`bin/github-release --version 1.0.1 publish`

The `--version` argument specifies the version of the new release (pick something sensible based on the previous releases). This version number is used for the release version, tag name, `version` property in the `package.json` and as part of the file name for the binary.

The script is bash and has no dependencies other than `curl` and those necessary for `middleman`.
