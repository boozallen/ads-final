Rails.application.routes.draw do
  resources :leaders, except: [:new, :edit]
  get 'effects/create'

  get 'drugs_controller/create'

  # Documentation
  apipie

  scope '/api/v1', except: [:new, :edit], defaults: { format: :json } do
    resources :drugs, only: [:show, :create]
    resources :effects, only: [:create]
    resources :leaders, only: [:index, :create]
    get 'leaders/latest', to: 'leaders#latest'
  end
end
