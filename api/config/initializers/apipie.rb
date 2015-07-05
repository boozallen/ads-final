Apipie.configure do |config|
  config.app_name                = 'API'
  config.api_base_url            = '/api/v1'
  config.doc_base_url            = '/documentation'
  # TODO: investigate better templating for apipie
  config.app_info = "LabelCraft API Documentation -- This site is provided to help developers integrate their applications with the LabelCraft API's. For example, these APIs could be used to extend the capabilities of LabelCraft out to an application for the Mechanical Turk platform to run a fee-based crowd-sourcing campaign.  The two API's provided by the LabelCraft back end consist of the Drugs API and the Effects API. The purpose of the Drugs API is to provide a reusable utility that takes the FDA information passed about a drug and returns the information about which adverse effects were reported and confirmed through the label craft platform.  The purpose of the Effects API is to store the user response for each question asking whether an adverse effect is found on the label."
  # where is your API defined?
  config.api_controllers_matcher = "#{Rails.root}/app/controllers/*.rb"
  config.reload_controllers = true
  config.show_all_examples = true
end
