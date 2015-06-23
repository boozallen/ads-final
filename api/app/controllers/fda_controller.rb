class FdaController < ApplicationController
  def index
    render json: Fda.query
  end

  def show
    render json: Fda.get(params[:id])
  end

  def update
  end

  def delete
  end

  def create
  end
end
