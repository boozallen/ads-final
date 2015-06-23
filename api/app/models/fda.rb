class Fda
  def self.query
    DATA
  end

  def self.get(id)
    url = "https://api.fda.gov/drug/label.json?search=boxed_warning+patient.drug.medicinalproduct:#{id}"
    response = JSON.parse(RestClient.get(url))
    response['results'][0]['adverse_reactions'].to_s
  end

  def self.reactions(id)
    warning = get(id)
    reacts = []
    File.open('wordlist.txt', 'r') do |file_handle|
      file_handle.each_line do |med_word|
        if warning.include? med_word.strip
          reacts << med_word.strip
        end
      end
    end
    reacts
  end
end
