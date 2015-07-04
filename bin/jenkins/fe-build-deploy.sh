#!/bin/bash
# build frontend image
echo '****** BUILDING FRONT END IMAGE ******'
sudo docker build -t $FRONTEND_IMAGE_NAME ./www

#!/bin/bash

# push front end to repository ($REGISTRY alias stored as jenkins global param)
echo '****** STARTING PUSH TO REPO ********'
sudo docker tag -f $FRONTEND_IMAGE_NAME "$REGISTRY"/$FRONTEND_IMAGE_NAME
sudo docker push $REGISTRY/$FRONTEND_IMAGE_NAME

# deploy to the aws ec2 environment the latest front end image from repo
echo '****** ENTERING AWS DOCKER CLIENT ENVIRONMENT ******'
eval "$(/usr/local/bin/docker-machine env $DOCKER_MACHINE_NAME)"
if [[ -n $(docker images | grep ^$REGISTRY/$FRONTEND_IMAGE_NAME) ]]; 
then 
  docker stop $FRONTEND_IMAGE_NAME
    docker rm $FRONTEND_IMAGE_NAME
    fi
    docker pull $REGISTRY/$FRONTEND_IMAGE_NAME:latest
    docker run -p 9000:9000 -d --name $FRONTEND_IMAGE_NAME $REGISTRY/$FRONTEND_IMAGE_NAME:latest grunt dev

