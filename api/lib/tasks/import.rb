namespace :import do
  task effects: :environment do
    File.open(File.join(Rails.root, 'db', 'data', 'medlist.txt')).each_line do |line|
      terms = line.split(',')
      next if terms.length < 2
      next if Effect.find_by medical_term: terms[0]
      Effect.create medical_term: terms[0], layman_term: terms[1]
    end
  end
end
