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


  echo "****** REMOVING BACKEND CONTAINTERS ******"
  #if [[ -n $(docker images | grep ^$REGISTRY/$BACKEND_IMAGE_NAME) ]]; 
  #then 
  #docker stop $BACKEND_IMAGE_NAME
  #docker rm $BACKEND_IMAGE_NAME
  #fi

  #if [[ -n $(docker images | grep ^$REGISTRY/$DATABASE_IMAGE_NAME) ]]; 
  #then 
  #docker stop $DATABASE_IMAGE_NAME
  #docker rm $DATABASE_IMAGE_NAME
  #fi

  #echo "****** PULLING BACKEND IMAGES ******"
  #docker pull $REGISTRY/$BACKEND_IMAGE_NAME:latest
  #docker pull $REGISTRY/$DATABASE_IMAGE_NAME:latest

  #echo "****** RUNNING BACKEND CONTAINERS ******"
  #DATABASE_ID=$(docker run -p 5432:5432 -d --name $DATABASE_IMAGE_NAME $REGISTRY/$DATABASE_IMAGE_NAME:latest postgres)
  #IP_ADDRESS=$(docker inspect --format='{{.NetworkSettings.IPAddress}}' $DATABASE_ID)
  #echo "IP_ADDRESS: $IP_ADDRESS"

  #until /usr/local/bin/docker-machine ssh $DOCKER_MACHINE_NAME "nc -z $IP_ADDRESS 5432"
  #do
  #    echo "Attempting to run backend...waiting for postgres container..."
  #    sleep 0.5
  #done

  #docker run -p 3000:3000 -d --name $BACKEND_IMAGE_NAME --net=host $REGISTRY/$BACKEND_IMAGE_NAME:latest


