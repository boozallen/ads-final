Rails.application.routes.draw do
  get 'effects/create'

  get 'drugs_controller/create'

  # Documentation
  apipie

  scope '/api/v1', except: [:new, :edit], defaults: { format: :json } do
    resources :drugs, only: [:show, :create]
  end
end
