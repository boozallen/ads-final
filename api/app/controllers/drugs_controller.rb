class DrugsController < ApplicationController
  api :POST, '/drugs', 'Returns drug information, reported adverse effects, and validation results of the label craft platform.'
  param :drug, Object, desc: 'Drug object retrieved from FDA feed', required: true

  def create
    drug = params[:drug]['object']
    effects = []

    if drug.nil? || drug['openfda']['brand_name'].nil?
      render json: { message: "Not enough information found for #{drug['openfda']['brand_name']}. Try searching for another drug above." }, status: 404
    end

    brand_name = drug['openfda']['brand_name'][0]

    fields = %w(boxed_warnings warnings_and_precautions user_safety_warnings precautions warnings general_precautions warnings_and_cautions adverse_reactions)
    adverse_reactions = fields.map { |f| drug.fetch(f, '') }.join('')
    drug.tap do |d|
      d['effects'] = []
      Fda.get_events(brand_name).each do |term|
        if adverse_reactions.match term
          # puts adverse_reactions
          d['effects'].push(term)
          effects.push(term)
        end
      end
      d['reported_effects'] = Drug.where(name: brand_name).tag_counts_on(:effects).map do |e|
        {
            effect: e.name,
            reported: e.taggings_count
        }
      end
    end

    yes_answers = Effect.where(drug_name: brand_name, response: true).group(:name).count
    no_answers = Effect.where(drug_name: brand_name, response: false).group(:name).count

    total_effects = []

    effects.each do |effect|
      total_effects.push effect
    end

    yes_answers.each do |effect|
      total_effects.delete effect[0]
    end
    no_answers.each do |effect|
      total_effects.delete effect[0]
    end

    render json: {drug: drug, effects: {yes_answers: yes_answers, no_answers: no_answers, effects: total_effects}}
  end

  def drug_params
    params[:drug].permit!
  end

  def drug_json(drug)
    {
        name: drug.name,
        effects: drug.effect_list
    }.as_json
  end
end
