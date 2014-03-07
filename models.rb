class Source < ActiveRecord::Base
  has_and_belongs_to_many :destinations
end

class Destination < ActiveRecord::Base
  has_and_belongs_to_many :sources

  def send_relay(params)
    HTTParty.post(self.url, :body => params)
  end
end
