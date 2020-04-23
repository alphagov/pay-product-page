###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

# General configuration

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

config[:css_dir] = 'pay-product-page/stylesheets'
config[:images_dir] = 'pay-product-page/images'
config[:fonts_dir] = 'pay-product-page/fonts'
config[:js_dir] = 'pay-product-page/javascripts'

# Google analytics
configure :development do
  set :analytics, ""
  set :new_cookie_banner, false
end

configure :build do
  set :analytics, "'UA-72121642-9'"
  set :new_cookie_banner, false
end


###
# Helpers
###

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  # activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript
end

activate :sprockets do |config|
  config.expose_middleman_helpers = true
end

sprockets.append_path File.join(root, 'node_modules/govuk-frontend/')
sprockets.append_path File.join(root, 'node_modules/gaap-analytics/build')

redirect "contact/index.html", to: "/support/"
redirect "features.html", to: "/using-govuk-pay/"
redirect "payment-links.html", to: "/govuk-payment-pages/"

# https://middlemanapp.com/advanced/pretty-urls/
activate :directory_indexes

activate :asset_hash
