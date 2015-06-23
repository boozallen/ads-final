Rails.application.routes.draw do
  scope '/api/v1', except: [:new, :edit], defaults: { format: :json } do

    resources :fda, only: [:index, :show], path: :drugs do
      resource :reactions
    end
  end
end
