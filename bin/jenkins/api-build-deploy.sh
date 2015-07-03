#!/bin/bash
# Create and publish docker images

# Build api and database images
echo '********* BUILD BACKEND IMAGE *****************'
sudo docker build -t $BACKEND_IMAGE_NAME api

echo '********* BUILD DATABASE IMAGE *****************'
sudo docker build -t $DATABASE_IMAGE_NAME api/database/postgres

# push to repo
echo '******* STARTING PUSH TO REPO *********'
sudo docker tag -f $BACKEND_IMAGE_NAME "$REGISTRY"/$BACKEND_IMAGE_NAME
sudo docker push "$REGISTRY"/$BACKEND_IMAGE_NAME
sudo docker tag -f $DATABASE_IMAGE_NAME "$REGISTRY"/$DATABASE_IMAGE_NAME
sudo docker push "$REGISTRY"/$DATABASE_IMAGE_NAME
echo "********* FINISHED PUSH TO REPO *********"

#!/bin/bash

cd 'api'
# deploy to the aws ec2 environment the latest front end image from repo
echo '****** ENTERING AWS DOCKER CLIENT ENVIRONMENT ******'
eval "$(/usr/local/bin/docker-machine env $DOCKER_MACHINE_NAME)"

if [ -f docker-compose.yml.erb ]
then
  erb docker-compose.yml.erb > docker-compose.yml
  fi
  cat docker-compose.yml
  echo '****** USING DOCKER-COMPOSE TO RESTART BACKEND SERVICE ******'
  docker-compose stop || :
  docker-compose pull --allow-insecure-ssl
  docker-compose up -d --allow-insecure-ssl
  echo "****** DOCKER-COMPOSE FINISHED ******"


