rake db:reset
export RAILS_ENV=docker
export RAILS_SECRET='rake secret'
rails s -b 0.0.0.0 -p 3000
