Rails.application.routes.draw do
  resources :drugs, except: [:new, :edit]
  resources :drugs, except: [:new, :edit]
  scope '/api/v1', except: [:new, :edit], defaults: { format: :json } do
    resources :fda, only: [:index, :show] do
      resource :reactions
    end
  end
end
