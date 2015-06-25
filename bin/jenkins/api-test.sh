#!/bin/bash

echo "********* RUNNING SECURITY SCAN ********"
CONTAINER_ID=$(sudo docker run -d $BACKEND_IMAGE_NAME brakeman -o brakeman-output.tabs --no-progress --separate-models);
sudo docker wait $CONTAINER_ID
sudo docker logs $CONTAINER_ID
sudo docker cp $CONTAINER_ID:/usr/src/app/brakeman-output.tabs $(pwd)/reports/
sudo docker rm $CONTAINER_ID

echo "********* RUNNING STATIC CODE ANALYSIS ********"
CONTAINER_ID=$(sudo docker run -d $BACKEND_IMAGE_NAME rubocop --require rubocop/formatter/checkstyle_formatter --format RuboCop::Formatter::CheckstyleFormatter --no-color --rails --out checkstyle.xml);
sudo docker wait $CONTAINER_ID
sudo docker logs $CONTAINER_ID
sudo docker cp $CONTAINER_ID:/usr/src/app/checkstyle.xml $(pwd)/reports/
sudo docker rm $CONTAINER_ID


echo "********* STARTING DATABASE FOR UNIT TESTS *********"
DATABASE_ID=$(sudo docker run -d -p 5432:5432 $DATABASE_IMAGE_NAME)
IP_ADDRESS=$(sudo docker inspect --format='{{.NetworkSettings.IPAddress}}' $DATABASE_ID)
echo "IP_ADDRESS: $IP_ADDRESS"
sleep 2


echo "********* RUNNING UNIT TESTS *********"
# run minitests if they exist
if [ -d "api/test" ]
then
  CONTAINER_ID=$(sudo docker run -d --net=host $BACKEND_IMAGE_NAME rake db:reset test);
    sudo docker wait $CONTAINER_ID
      sudo docker logs $CONTAINER_ID
        sudo docker rm $CONTAINER_ID
	fi

	# run rspec unit tests if they exist
	if [ -d "api/spec" ]
	then
	  CONTAINER_ID=$(sudo docker run -d --net=host $BACKEND_IMAGE_NAME rspec);
	    sudo docker wait $CONTAINER_ID
	      sudo docker logs $CONTAINER_ID
	        sudo docker rm $CONTAINER_ID
		fi

		echo "******** RUNNING FUNCTIONAL TESTS ********"
		if [ -d "api/features" ]
		then
		  CONTAINER_ID=$(sudo docker run -d --net=host $BACKEND_IMAGE_NAME cucumber);
		    sudo docker wait $CONTAINER_ID
		      sudo docker logs $CONTAINER_ID
		        sudo docker rm $CONTAINER_ID
			fi

			echo "********* KILLING TEST DATABASE ********"
			sudo docker rm -f $DATABASE_ID
