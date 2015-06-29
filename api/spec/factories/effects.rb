FactoryGirl.define do
  factory :effect do
    sequence :name do |n|
      "Effect #{n}"
    end
  end
end
