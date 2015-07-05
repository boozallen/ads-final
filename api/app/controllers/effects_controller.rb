class EffectsController < ApplicationController
  api :POST, '/effects', 'Records response to question regarding whether an effect is found on a label.'
  param :drug_name, String, desc: 'The brand name of the drug', required: true
  param :effect, String, desc: 'The reported adverse effect', required: true
  param :response, [true,false], desc: 'true if found on the label and described as an adverse effect, false otherwise', required: true

  def create
    render json: Effect.create!(drug_name: params[:drug_name], name: params[:effect], response: params[:response])
  end
end
