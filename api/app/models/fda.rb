class Fda
  def self.get(drug_name)
    url = "https://api.fda.gov/drug/label.json?limit=100&search=openfda.brand_name.exact:#{drug_name}"
    begin
      JSON.parse(RestClient.get(url, accept: :json))['results'].sort do |a, b|
        b['effective_time'].to_i <=> a['effective_time'].to_i
      end.first
    rescue StandardError => e
      Rails.logger.error e
      nil
    end
  end

  def self.get_events(drug_name)
    url = "https://api.fda.gov/drug/event.json?count=patient.reaction.reactionmeddrapt.exact&limit=1000&search=patient.drug.medicinalproduct:#{drug_name}"
    events = []
    begin
      JSON.parse(RestClient.get(url, accept: :json))['results'].each do |event|
        events.push(event['term'].downcase)
      end
    rescue StandardError => e
      Rails.logger.error e
      nil
    end
    events
  end
end
