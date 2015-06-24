class DrugsController < ApplicationController
  api :GET, '/drugs/:id', 'Shows drug as returned from FDA with parsed effects by :id'
  param :id, String, required: true

  def show
    render json: drug
  end

  api :POST, '/drugs', 'Creates or Updates a drug entry by name'
  param :name, String, desc: 'Drug Brand Name', required: true
  param :effects, Array, desc: 'Drug effects that have been experienced'

  def create
    drug = Drug.find_or_create_by name: params[:name]
    drug.effect_list.add params[:effects]
    drug.save
    render json: drug_json(drug)
  end

  private

  def drug
    @_drug = Fda.get params[:id]
    fields = %w(boxed_warnings warnings_and_precautions user_safety_warnings precautions warnings general_precautions warnings_and_cautions adverse_reactions)
    adverse_reactions = fields.map { |f| @_drug.fetch(f, '') }.join('')
    @_drug['effects'] = EFFECTS_LIST.select do |terms|
      adverse_reactions.match terms[:medical_term]
    end
    @_drug
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
