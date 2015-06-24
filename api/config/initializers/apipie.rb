Apipie.configure do |config|
  config.app_name                = 'Jellyfish API'
  config.api_base_url            = '/api/v1'
  config.doc_base_url            = '/documentation'
  # where is your API defined?
  config.api_controllers_matcher = "#{Rails.root}/app/controllers/*.rb"
  config.reload_controllers = true
  config.show_all_examples = true
end
