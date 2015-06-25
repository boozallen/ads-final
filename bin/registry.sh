##This will run private docker repository on your machine. 

#Please note that this script will expect you to have /var/lib/registry path in your computer.
#Change it to the path you want to store images in. 
docker run -d -p 5000:5000  -v /var/lib/registry:/tmp/registry/repositories/library --restart=always --name registry registry:2
