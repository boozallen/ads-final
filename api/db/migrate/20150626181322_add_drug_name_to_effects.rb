class AddDrugNameToEffects < ActiveRecord::Migration
  def change
    add_column :effects, :drug_name, :string
  end
end
