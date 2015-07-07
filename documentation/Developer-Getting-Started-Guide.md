## Quickstart Guide
####Install Docker
Go to https://docs.docker.com/ and install docker on your computer.

####Run Docker Container Manually
* Clone the repository
* Go inside the project folder
* `docker build -t frontend www`
* `docker run -p 9000:9000 -d frontend`. In your browser, type in localhost:9000 and you will be able to see front end content. 
* `docker build -t database api/database/postgres`
* `docker run --name pgdb -p 5432:5432 -d database`
* `docker build -t api api`
* `docker run -p 3000:3000 --link pgdb:db -e "RAILS_ENV=docker" -d api`<br>


####Run Build Script for Docker Container
* Clone the repository
* Go inside the project folder
* Go inside the bin folder
* Run `source build.sh`. This will run front end, api, and database containers. Once all containers are running, you can put localhost:3000 in the browser to see the website. 

Since we are using the name flag, you may need to clear out the docker container on subsequent runs.  The following can be used to clean-up between runs:
* Run `source cleanup.sh`. This will stop and remove the containers.

