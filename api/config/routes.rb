Rails.application.routes.draw do
  scope '/api/v1', except: [:new, :edit], defaults: { format: :json } do
    resources :drugs, only: [:index, :show, :create] do
      resource :reactions
    end
  end
end
