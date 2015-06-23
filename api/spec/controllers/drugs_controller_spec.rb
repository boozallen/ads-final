require 'rails_helper'

RSpec.describe DrugsController, type: :controller do
  context 'GET #show' do
    it 'returns JSON for existing medicines' do
      get :show, id: 'Advil'
      expect(JSON.parse(response.body)['effects'].length).to be > 0
    end

    it 'creates a new drug entry' do
      post :create, name: 'A New Drug', effects: ['newness']
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json['name']).to eq('A New Drug')
      expect(json['effects']).to eq(['newness'])
    end

    it 'appends effects to existing entries' do
      post :create, name: 'A New Drug', effects: ['oldness']
      json = JSON.parse(response.body)
      expect(json['name']).to eq('A New Drug')
      expect(json['effects']).to eq(%w(newness oldness))
    end
  end
end
