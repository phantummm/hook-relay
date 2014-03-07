require 'sinatra'

post '/ping' do
  puts params
  status 200
end
