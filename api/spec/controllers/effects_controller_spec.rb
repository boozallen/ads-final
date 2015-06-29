require 'rails_helper'

RSpec.describe EffectsController, type: :controller do
  context 'GET #show' do
    it 'returns JSON for existing medicines' do
      get :show, id: 'Advil'
      expect(response).to be_success
    end
  end

  context 'POST #create' do
    it 'a new effect' do
      post :create, drug_name: 'Advil', name: 'pain', response: true
      expect(response).to be_success
    end
  end
end
