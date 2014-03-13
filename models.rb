class Source < ActiveRecord::Base
  has_and_belongs_to_many :destinations

  def self.generate_sources
    @sources = Array.new
    
    self.includes(:destinations).order("created_at DESC").each do |source|
      @sources << { :source => source,
                    :destinations => source.destinations }
    end

    @sources
  end
end

class Destination < ActiveRecord::Base
  has_and_belongs_to_many :sources

  def send_relay(params)
    HTTParty.post(self.url, :body => params)
  end
end
