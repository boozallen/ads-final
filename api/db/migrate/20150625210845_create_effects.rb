class CreateEffects < ActiveRecord::Migration
  def change
    create_table :effects do |t|
      t.string :name
      t.belongs_to :drug

      t.timestamps null: false
    end
  end
end
