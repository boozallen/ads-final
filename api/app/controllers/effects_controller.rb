class EffectsController < ApplicationController
  api :POST, '/events', 'Record new events response to question.'

  def create
    render json: Effect.create!(effect_params)
  end

  private

  def effect_params
    params.permit!.slice(:drug_name, :effect, :response).tap { |p| p[:name] = p.delete :effect }
  end
end
