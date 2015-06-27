class EffectsController < ApplicationController
  api :POST, '/events', 'Record new events response to question.'

  def create
    render json: Effect.create!(effect_params)
  end

  private

  def effect_params
    params.permit :drug_name, :name, :response
  end
end
