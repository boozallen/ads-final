class Leader < ActiveRecord::Base
  validates_presence_of(:name)
  validates :name, length: { maximum: 20 }
end
