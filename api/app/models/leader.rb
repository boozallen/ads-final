class Leader < ActiveRecord::Base
  validates_presence_of :name, message: 'You must enter a name to submit.'
  validates_length_of :name, maximum: 20, message: 'Name must be less than 20 characters.'
end
