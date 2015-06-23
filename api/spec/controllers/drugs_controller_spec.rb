require 'rails_helper'

RSpec.describe DrugsController, type: :controller do
  context 'GET #show' do
    it 'returns JSON for existing medicines' do
      get :show, id: 'Advil'
      expect(JSON.parse(response.body)['effects'].length).to be > 0
    end
  end
end
