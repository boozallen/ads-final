class LeadersController < ApplicationController
  swagger_controller :leaders, 'Leaderboard submissions'

  swagger_api :index do
    summary 'Returns all leaderboard submissions.'
    notes 'Names are returned ordered by the number of submissions'
  end

  def index
    render json: leaders
  end

  swagger_api :create do
    summary 'Create a new leaderboard submission.'
    param :form, :name, :string, :required, 'Participant name'
    param :form, :total, :integer, :required, 'Number of ...'
    param :form, :zipcode, :string, :required, 'Participant zipcode'
    response :not_acceptable
  end

  def create
    leader.increment! :count
    render json: leader
  end

  swagger_api :latest do
    summary 'Returns the 10 most recent leaderboard submissions.'
    notes 'Names are returned ordered by the submission time'
  end

  def latest
    render json: Leader.order(:updated_at).limit(10)
  end

  # Leader Model definition
  swagger_model :Leader do
    description 'Leaderboard particpant submission'
    property :id, :integer, :required, 'Submission id'
    property :name, :string, :required, 'Participant'
    property :count, :integer, :required, 'Count of ...'
    property :zipcode, :string, :required, 'Participant zipcode'
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
