Rails.application.routes.draw do
  # Documentation
  apipie

  scope '/api/v1', except: [:new, :edit], defaults: { format: :json } do
    resources :drugs, only: [:show, :create]
    resources :effects, only: [:create]
    resources :leaders, only: [:index, :create] do
      collection do
        get :latest
      end
    end
  end
end
