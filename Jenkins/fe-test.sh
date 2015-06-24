# run frontend unit and integration tests
echo '****** STARTING PUSH TO REPO ********'
CONTAINER_ID=$(sudo docker run -d $FRONTEND_IMAGE_NAME grunt test);
sudo docker wait $CONTAINER_ID || {}
sudo docker rm $CONTAINER_ID
