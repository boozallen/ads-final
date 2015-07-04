class EffectsController < ApplicationController
  api :POST, '/events', 'Record new events response to question.'

  def create
    render json: Effect.create!(drug_name: params[:drug_name], name: params[:effect], response: params[:response])
  end
end
