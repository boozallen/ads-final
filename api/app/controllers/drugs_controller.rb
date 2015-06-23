class DrugsController < ApplicationController
  def index
    render json: Drugs.query
  end

  def show
    render json: Drugs.get(params[:id])
  end

  def update
  end

  def delete
  end

  def create
  end
end
