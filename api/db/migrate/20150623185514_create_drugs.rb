class CreateDrugs < ActiveRecord::Migration
  def change
    create_table :drugs do |t|
      t.string :name
      t.string :cached_effect_list

      t.timestamps null: false
    end
  end
end
