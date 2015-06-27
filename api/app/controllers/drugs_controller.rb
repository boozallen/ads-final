class DrugsController < ApplicationController
  api :GET, '/drugs/:id', 'Shows drug as returned from FDA with parsed effects by :id'
  param :id, String, required: true

  def show
    if drug.nil?
      render nothing: true, status: 404
    else
      yes_answers = Effect.where(drug_name: params[:id], response: true).group(:name).count
      no_answers = Effect.where(drug_name: params[:id], response: false).group(:name).count

      total_effects = []

      @effects.each do |effect|
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
  end

  api :POST, '/drugs', 'Creates or Updates a drug entry by name'
  param :name, String, desc: 'Drug Brand Name', required: true
  param :effects, Array, desc: 'Drug effects that have been experienced'

  def create
    drug = Drug.create! drug_params
    render json: drug
  end

  private

  def drug
    @_drug = Fda.get params[:id]
    @effects = []

    return nil if @_drug.nil?
    #if @_drug.nil?
    #  render nothing: true, status: 404
    #  fail
    #end

    fields = %w(boxed_warnings warnings_and_precautions user_safety_warnings precautions warnings general_precautions warnings_and_cautions adverse_reactions)
    adverse_reactions = fields.map { |f| @_drug.fetch(f, '') }.join('')
    @_drug.tap do |d|
      d['effects'] = []
      Fda.get_events(@_drug['openfda']['brand_name'][0]).each do |term|
        if adverse_reactions.match term
          d['effects'].push(term)
          @effects.push(term)
        end
      end
      d['reported_effects'] = Drug.where(name: params[:id]).tag_counts_on(:effects).map do |e|
        {
            effect: e.name,
            reported: e.taggings_count
        }
      end
    end
  end

  def drug_params
    params.permit!.slice(:name, :effects).tap { |p| p[:effect_list] = p.delete :effects }
  end

  def drug_json(drug)
    {
        name: drug.name,
        effects: drug.effect_list
    }.as_json
  end
end
