class DrugsController < ApplicationController
  api :GET, '/drugs/:id', 'Shows drug as returned from FDA with parsed effects by :id'
  param :id, String, required: true

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

  def drug_params
    params.permit!.slice(:name, :effects).tap { |p| p[:effect_list] = p.delete :effects }
  end
end
