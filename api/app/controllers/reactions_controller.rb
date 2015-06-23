class ReactionsController < ApplicationController
  def index
  end

  def show
    render json: Fda.reactions(params[:drug_id])
  end

  def update
  end

  def delete
  end

  def create
  end
end
