###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page "/*.xml", layout: false
page "/*.json", layout: false
page "/*.txt", layout: false

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

config[:css_dir] = "stylesheets"
config[:images_dir] = "images"
config[:js_dir] = "javascripts"

ignore "**/javascripts/*test*.js"

# Google analytics
configure :development do
  set :analytics, ""
  set :new_cookie_banner, true
end

configure :build do
  activate :relative_assets
  set :relative_links, true
  set :analytics, "'UA-72121642-9'"
  set :new_cookie_banner, true
end

###
# Helpers
###

# Methods defined in the helpers block are available in templates
helpers do
  def path_value(url)
    url.delete_prefix('/').delete_suffix('/')
  end

  def tel_to(text, className)
    groups = text.to_s.scan(/(?:^\+)?\d+/)
    link_to text, "tel:#{groups.join ''}", className
  end
  
  # https://frontend.design-system.service.gov.uk/import-javascript/#use-a-hash-to-unblock-inline-javascript
  def csp_nonce
    SecureRandom.base64(24)
  end
end

activate :sprockets do |config|
  config.expose_middleman_helpers = true
end


sprockets.append_path File.join(root, "node_modules/")
sprockets.append_path File.join(root, "node_modules/gaap-analytics/build")

after_build do |builder|
  FileUtils.mkdir_p(File.join(root, "build/assets/javascripts"))

  FileUtils.cp(
    File.join(root, "node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.js"),
    File.join(root, "build/assets/javascripts/govuk-frontend.min.js")
  )
end

redirect "security.txt.html", to: "https://vdp.cabinetoffice.gov.uk/.well-known/security.txt"
redirect ".well-known/security.txt.html", to: "https://vdp.cabinetoffice.gov.uk/.well-known/security.txt"

redirect "contact/index.html", to: "/support/"
redirect "features.html", to: "/using-govuk-pay/"
redirect "payment-links.html", to: "/govuk-payment-pages/"

# https://middlemanapp.com/advanced/pretty-urls/
activate :directory_indexes

activate :asset_hash
