Rails.application.routes.draw do
  # Documentation
  apipie

  scope '/api/v1', except: [:new, :edit], defaults: { format: :json } do
    resources :drugs, only: [:show, :create] do
      resource :reactions
    end
  end
end
