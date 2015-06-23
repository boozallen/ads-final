class DrugsController < ApplicationController
  def index
    render json: {}
  end

  def show
    render json: drug
  end

  def update
  end

  def delete
  end

  def create
    drug = Drug.create drug_params
    render json: drug_json(drug)
  end

  private

  def drug
    @_drug = Fda.get params[:id]
#    fields = %w(adverse_reactions boxed_warnings warnings_and_precautions user_safety_warnings precautions warnings general_precautions)
    fields = %w(boxed_warnings warnings_and_precautions user_safety_warnings precautions warnings general_precautions)
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
