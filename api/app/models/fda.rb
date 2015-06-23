class Fda

  LIMIT = 100

  def self.query
    DATA
  end

  def self.get(drug_name)
    url = "https://api.fda.gov/drug/label.json?limit=100&search=openfda.brand_name.exact:#{drug_name}"
    begin
      results = JSON.parse(RestClient.get(url, accept: :json))['results'].sort do |a, b|
        b['effective_time'].to_i <=> a['effective_time'].to_i
      end.first
    rescue StandardError => e
      p e
      {}
    end
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
