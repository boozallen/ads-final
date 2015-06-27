require 'rails_helper'

RSpec.describe DrugsController, type: :controller do
  context 'GET #show' do
    it 'returns JSON for existing medicines' do
      get :show, id: 'Advil'
      expect(response).to be_success
    end
  end
end
