class EffectsController < ApplicationController
  swagger_controller :effects, 'Reported Drug Effects'

  swagger_api :show do
    summary 'Returns all reported effects for a drug.'
    notes 'Effects can be reported as not existing or existing on the drug label'
    param :path, :id, :string, :required, 'Brand name of drug'
    response :not_found
  end

  def show
    if drug.nil?
      render nothing: true, status: 404
    else
      answers = Hash[
        Effect
        .where(drug_name: params[:id])
        .select("name, SUM(CASE response WHEN 't' THEN 1 ELSE 0 END) AS yes_count, SUM(CASE response WHEN 'f' THEN 1 ELSE 0 END) AS no_count")
        .group(:name)
        .map { |e| [e.name, { yes: e.yes_count, no: e.no_count }] }
      ]

      total_effects = []

      @effects.each do |effect|
        total_effects.push effect
      end

      answers.each do |answer|
        total_effects.delete answer.first
      end

      render json: { drug: drug, effects: { answers: answers, effects: total_effects } }
    end
  end

  swagger_api :create do
    summary 'Create a new drug effect report.'
    notes 'Effects can be reported as not existing or existing on the drug label'
    param :form, :drug_name, :string, :required, 'Brand name of drug'
    param :form, :effect, :string, :required, 'Effect name (lowercased)'
    param :form, :response, :boolean, :required, 'Effect exists in label or has been experienced'
    response :not_acceptable
  end

  def create
    render json: Effect.create!(effect_params)
  end

  # Effect Model definition
  swagger_model :Effect do
    description 'Reported drug effect'
    property :id, :integer, :required, 'Report id'
    property :drug_name, :string, :required, 'Brand name of drug'
    property :name, :string, :required, 'Effect name (lowercased)'
    property :response, :boolean, :required, 'Effect exists in label or has been experienced'
  end

  private

  def drug
    @_drug = Fda.get params[:id]
    @effects = []

    return nil if @_drug.nil?

    fields = %w(boxed_warnings warnings_and_precautions user_safety_warnings precautions warnings general_precautions warnings_and_cautions adverse_reactions)
    adverse_reactions = fields.map { |f| @_drug.fetch(f, '') }.join('')
    @_drug.tap do |d|
      d['effects'] = []
      Fda.get_events(@_drug['openfda']['brand_name'][0]).each do |term|
        if adverse_reactions.match term
          d['effects'] << term
          @effects << term
        end
      end
    end
  end

  def effect_params
    params.permit!.slice(:drug_name, :effect, :response).tap { |p| p[:name] = p.delete :effect }
  end
end
