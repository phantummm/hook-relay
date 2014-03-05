SOURCES = [
  ["Google", "http://google.com"],
  ["Derbis", "http://derbis.org"],
  ["AD60",   "http://ad60.com"]
]

DESTINATIONS = [
  [
    ['MyLogger', "http://mylogger.com"],
    ['TheOtherLogger', "http://otherone.com"]
  ],
  [
    ['Still Loggin', "http://stilloggin.com"],
    ['CantStopMeLogging', "http://unstoppable.com"]
  ],
  [
    ['Still Going?', "http://stillloggingitall.com"]
  ]
]

SOURCES.each_with_index do |s, i|
  source = Source.create(:title => s[0], :url => s[1])

  DESTINATIONS[i].each do |d|
    source.destinations.create(:title => d[0], :url => d[1])
  end
end