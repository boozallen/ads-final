module Swagger
  module Docs
    class Generator
      def self.trim_slashes(str)
        '/' + trim_leading_slash(trim_trailing_slash(str))
      end
    end

    Config.base_api_controller = ActionController::API
    Config.register_apis(
      '1.0' => {
        # where to find controllers in relation to app/controllers
        controller_base_path: '',
        # the extension used for the API
        api_extension_type: :json,
        # the output location where your .json files are written to
        api_file_path: '../www/docs/api/',
        # the URL base path to your API
        base_path: '/',
        # if you want to delete all .json files at each generation
        clean_directory: true,
        # add custom attributes to api-docs
        attributes: {
          info: {
            'title' => 'ADS labelcraft API',
            'description' => 'API backend',
            'termsOfServiceUrl' => 'https://github.com/booz-allen-agile-delivery/ads-final',
            'contact' => 'apiteam@wordnik.com',
            'license' => 'Apache 2.0',
            'licenseUrl' => 'http://www.apache.org/licenses/LICENSE-2.0.html'
          }
        }
      }
    )
  end
end
