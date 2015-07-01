class LeadersController < ApplicationController
  def index
    render json: Leader.all.order(updated_at: :desc).limit(10)
  end

  def create
    if Leader.find_by_name(params[:leader][:name])
      leader = Leader.find_by_name(params[:leader][:name])
      leader.count += params[:leader][:count]
      render json: leader.save
    else
      render json: Leader.create!(leader_params)
    end
  end

  def latest
    render json: Leader.all.order(:updated_at).limit(10)
  end

  private

  def leader_params
    params.require(:leader).permit!
  end
end
