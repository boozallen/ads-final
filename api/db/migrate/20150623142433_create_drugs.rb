class CreateDrugs < ActiveRecord::Migration
  def change
    create_table :drugs do |t|
      t.string :fda_id, null: false
      t.string :cached_tag_list
      t.timestamps null: false
    end
  end
end
