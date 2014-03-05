class CreateSources < ActiveRecord::Migration
  def change
    create_table :sources do |t|
      t.string :title
      t.string :url, :unique => true, :null => false
      t.timestamps
    end

    add_index :sources, :url
  end
end
