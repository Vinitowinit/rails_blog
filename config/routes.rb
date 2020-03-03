Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'articles/index'
      post 'articles/create'
      get '/show/:id', to: 'articles#show'
      delete  '/destroy/:id', to: 'articles#destroy'
    end
  end

  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # path will ensure any routes that dont exist the ones mentioned above pushes user back to homepage
end

