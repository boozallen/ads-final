class AddResponseToEffects < ActiveRecord::Migration
  def change
    add_column :effects, :response, :boolean
  end
end
