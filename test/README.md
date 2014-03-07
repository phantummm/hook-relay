Simple setup for testing hook-relay:
* single-route Sinatra app (relay-catcher) which prints received params to console
* a data file of params mocking those sent by Heroku webhook, which can be posted with...
* httparty gem (also used in main app) from the command line like this:
    httparty -a post -d @data.txt "http://localhost:9393/relay"

In hook-relay, create a source corresponding to the url set in data.txt, and give it a destination of wherever you're running the catcher app. Then run the httparty command, and you should see the catcher app logging the params from data.txt to its console.

