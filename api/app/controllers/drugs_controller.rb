class DrugsController < ApplicationController
  def get
    respond_with drug
  end

  private

  def drug
    @_drug = Drug.find params[:id]
  end
end
