FactoryGirl.define do
  factory :leader do
    sequence :name do |n|
      "Leader #{n}"
    end
    count 1
  end
end
