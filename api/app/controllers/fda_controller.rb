class FdaController < ApplicationController
  def index
    render json: {}
  end

  def show
    render json: drug
  end

  def update
  end

  def delete
  end

  def create
  end

  private

  def drug
    @_drug = Fda.get params[:id]
    adverse_reactions = (@_drug['adverse_reactions'] || @_drug['warnings'] || ['']).first
    @_drug['effects'] = EFFECTS_LIST.select do |terms|
      adverse_reactions.match terms[:medical_term]
    end
    @_drug
  end
end
