class Drug < ActiveRecord::Base
  acts_as_taggable_on :effects
end
