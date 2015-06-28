class LeadersController < ApplicationController
  api :GET, '/leaders', 'Returns all leaders'

  def index
    render json: leaders
  end

  api :POST, '/leaders', 'Create or updates existing leaders found by name'
  param :name, String, desc: 'Leader name'
  param :total, Integer, desc: 'Leader total'
  param :zipcode, String, desc: 'Leader zipcode'

  def create
    leader.increment! :count
    render json: leader
  end

  api :GET, '/leaders/latest', 'Returns 10 leaders sorted by updated_at'

  def latest
    render json: Leader.order(:updated_at).limit(10)
  end

  private

  def leader_params
    params.permit!(:name, :total, :zipcode)
  end

  def leaders
    Leader.all.order :count
  end

  def leader
    Leader.find_or_create_by name: params[:name]
  end
end
