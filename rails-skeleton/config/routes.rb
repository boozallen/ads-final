Rails.application.routes.draw do

  scope '/api/v1', except: [:new, :edit], defaults: { format: :json } do

    resources :foobar

  end

end
