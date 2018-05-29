require "kemal"
require "turbolinks"

add_handler Turbolinks::Handler.new

# Renders a template within the `/views` directory in the context of the
# `views/layout.ecr` layout. For example,
#
# ```
# view "home"
# ```
#
# renders the `home` template.
macro view(filename)
  render "views/#{{{filename}}}.ecr", "views/layout.ecr"
end

get "/" do |env|
  view "home"
end

get "/post" do
  view "post"
end

# Legacy routes
get "/2016/09/04/deploy-ghost-with-caddy/" do
  view "post"
end

# Test redirection
get "/redirect" do |env|
  env.redirect "/"
end

Kemal.run
