class CreateDestinations < ActiveRecord::Migration
  def change
    create_table :destinations do |t|
      t.string :title
      t.string :url, :unique => true, :null => false
      t.string :extra_parameters
      t.timestamps
    end

    add_index :destinations, :url
  end
end
