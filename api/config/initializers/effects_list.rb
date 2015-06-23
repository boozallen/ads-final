EFFECTS_LIST = File.open(File.join(Rails.root, 'dbdata', 'medlist.txt')).map do |line|
  terms = line.chomp.split(',').map { |t| t.strip }
  {
    medical_term: terms.first,
    layman_term: terms.last
  }
end
