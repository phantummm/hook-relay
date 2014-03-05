def generate_sources
  @sources = Array.new
  
  Source.includes(:destinations).order("created_at DESC").each do |source|
    @sources << { :source => source,
                  :destinations => source.destinations }
  end

  @sources
end