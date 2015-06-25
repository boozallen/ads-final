require 'rails_helper'

RSpec.describe DrugsController, type: :controller do
  context 'GET #show' do
    it 'returns JSON for existing medicines' do
      get :show, id: 'Advil'
      expect(JSON.parse(response.body)['effects'].length).to be > 0
    end

    it 'creates a new drug entry' do
      post :create, name: 'A Test Drug', effects: ['newness']
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json['name']).to eq('A Test Drug')
      expect(json['effects']).to eq(['newness'])
    end

    it 'does not append effects to existing entries' do
      post :create, name: 'A Repeating Drug', effects: ['first']
      json = JSON.parse(response.body)
      expect(json['name']).to eq('A Repeating Drug')
      expect(json['effects']).to eq(%w(first))
      post :create, name: 'A Repeating Drug', effects: ['second']
      json = JSON.parse(response.body)
      expect(json['name']).to eq('A Repeating Drug')
      expect(json['effects']).to eq(%w(second))
    end

    it 'returns reported effects' do
      post :create, name: 'A Reported Drug', effects: %w(first)
      post :create, name: 'A Reported Drug', effects: %w(second)
      post :create, name: 'A Reported Drug', effects: %w(second third)
      post :create, name: 'A Reported Drug', effects: %w(first second third)
      get :show, id: 'A Reported Drug'
      json = JSON.parse(response.body)
      expect(json['reported_effects']).not_to be_empty
      expect(json['reported_effects'].length).to eq(3)
    end
  end
end
