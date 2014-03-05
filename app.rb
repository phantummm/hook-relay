require 'sinatra'
require 'sinatra/activerecord'
require 'httparty'

configure :development do
  require 'debugger'
  set :database, "sqlite3:///hook_relay.db"
end

require './models'
require './helpers'

get "/" do
  erb :index
end

get "/css/index.css" do
  scss :index_style
end

# post '/relay' do
#   source = Source.where(:url => params[:url])

#   source.destinations.each do |destination|
#     destination.send(params)
#   end
# end

get '/sources' do
  content_type :json
  generate_sources

  @sources.to_json
end
