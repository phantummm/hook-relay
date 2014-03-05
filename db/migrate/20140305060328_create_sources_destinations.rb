class CreateSourcesDestinations < ActiveRecord::Migration
  def change
    create_table :destinations_sources, :id => false do |t|
      t.belongs_to :source
      t.belongs_to :destination
    end
  end
end
