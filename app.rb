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

post '/relay' do
  pp params

  source = Source.find_by(:url => params[:url]) || nil

  unless !source
    source.destinations.each {|d| d.send_relay(params) }
  end

  status 200
end

get '/sources' do
  content_type :json
  generate_sources

  @sources.to_json
end

post '/source/new' do
  content_type :json
  @source = Source.create(params)

  @source.to_json
end

post '/source/:id/destination/new' do
  content_type :json
  @source = Source.find(params[:id])
  @destination = @source.destinations.create(params[:destination])

  @destination.to_json
end
