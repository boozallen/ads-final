class CreateLeaders < ActiveRecord::Migration
  def change
    create_table :leaders do |t|
      t.string :name
      t.integer :count

      t.timestamps null: false
    end
  end
end
