class FoobarController < ApplicationController

  def index
    render json: Foobar.query
  end

  def show
    render json: Foobar.get(params[:id])
  end

  def create
    render nothing: true, status: :created
  end

  def update
    render json: Foobar.get(params[:id])
  end

  def destroy
    render nothing: true, status: :ok
  end
end
