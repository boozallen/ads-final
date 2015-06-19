# get ready to compile ruby
FROM ruby:2.2

# Install bundler
RUN gem install bundler

# Install gems
COPY ["Gemfile","/usr/src/api/" ]
COPY ["Gemfile.lock","/usr/src/api/" ]
WORKDIR /usr/src/api
RUN bundle install

# Install npm
RUN yum install -y --skip-broken npm
