class AddZipcodeToLeaders < ActiveRecord::Migration
  def change
    add_column :leaders, :zipcode, :string
  end
end
