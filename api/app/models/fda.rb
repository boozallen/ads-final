class Fda
  def self.get(drug_name)
    url = "https://api.fda.gov/drug/label.json?limit=100&search=openfda.brand_name.exact:#{drug_name}"
    begin
      JSON.parse(RestClient.get(url, accept: :json))['results'].sort do |a, b|
        b['effective_time'].to_i <=> a['effective_time'].to_i
      end.first
    rescue StandardError => e
      Rails.logger.error e
      {}
    end
  end
end
