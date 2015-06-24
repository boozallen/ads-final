rake db:reset
echo $RAILS_ENV
export RAILS_ENV=docker
echo $RAILS_ENV
export RAILS_SECRET='rake secret'
rails s -b 0.0.0.0 -p 3000
