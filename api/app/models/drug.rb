class Drug < ActiveRecord::Base
  acts_as_taggable_on :effects_tag
  has_many :effects
end
