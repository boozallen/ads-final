Rails.application.routes.draw do
  scope '/api/v1', except: [:new, :edit], defaults: { format: :json } do
    resources :effects, only: [:show, :create]
    resources :leaders, only: [:index, :create] do
      collection do
        get :latest
      end
    end
  end
end
