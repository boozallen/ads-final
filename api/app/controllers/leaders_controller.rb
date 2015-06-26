class LeadersController < ApplicationController
  def index
    Leader.all.order(:count)
  end

  def create
    if Leader.find_by_name(params[:name])
      leader = Leader.find_by_name(params[:name])
      leader.count += count
      leader.save
    else
      Leader.create! leader_params
    end
  end

  def latest
    Leader.all.order(:updated_at).limit(10)
  end

  private

  def leader_params
    params.require(:leader).permit!(:name, :total)
  end
end
