class EffectsController < ApplicationController
  api :POST, '/events', 'Record new events response to question.'

  def create
    Effect.create!(drug_name: params[:drug_name], name: params[:effect].effect.medical_term, response: params[:response])
  end
end
