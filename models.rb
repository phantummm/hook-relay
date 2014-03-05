class Source < ActiveRecord::Base
  has_and_belongs_to_many :destinations
end

class Destination < ActiveRecord::Base
  has_and_belongs_to_many :sources

  # def send(params)
  #   HTTParty.post(self.url, :query => params)
  # end
end
