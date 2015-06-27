require 'rails_helper'

RSpec.describe EffectsController, type: :controller do
  context 'POST #create' do
    it 'a new effect' do
      post :create, drug_name: 'Advil', name: 'pain', response: true
      expect(response).to be_success
    end
  end
end
