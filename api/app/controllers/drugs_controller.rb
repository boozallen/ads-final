class DrugsController < ApplicationController
  def index
    respond_with drugs
  end

  def get
    respond_with drug
  end

  def create
    respond_with Drug.create drug_params
  end

  def update
    respond_with drug.update drug_params
  end

  def destroy
    respond_with drug.destroy
  end

  private

  def drugs
    @_drugs = Drug.all
  end

  def drug
    @_drug = Drug.find params[:id]
  end

  def drug_params
    params.permit!.slice(:fda_id, :tag_list)
  end
end
