# get ready to compile ruby
FROM centos:latest
RUN yum install -y gcc
RUN yum install -y make
RUN yum install -y automake
RUN yum install -y autoconf
RUN yum install -y curl-devel
RUN yum install -y openssl-devel
RUN yum install -y zlib-devel
RUN yum install -y httpd-devel
RUN yum install -y apr-devel
RUN yum install -y apr-util-devel
RUN yum install -y ruby-devel

# Update fedora
RUN rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm

# Install rvm and target ruby version
RUN \curl -sSL https://get.rvm.io | bash
RUN echo "rvm_install_on_use_flag=1" >> ~/.rvmrc
RUN source ~/.rvm/scripts/rvm
RUN rvm use "$TARGET_RAILS_VERSION"

# Install bundler
RUN gem install bundler

# Install gems
COPY ["Gemfile","/usr/src/api/" ]
COPY ["Gemfile.lock","/usr/src/api/" ]
WORKDIR /usr/src/api
RUN bundle install

# Install npm
RUN yum install -y --skip-broken npm
