#Install Guide

Building this project is made easy with Docker, the following instruction sets will get you up and running in no time. 

####Install Docker
Go to https://docs.docker.com/ and install docker on your computer.

####Run Build Script for entire prototype
* Clone the repository
* Go inside the project folder
* Run `source /bin/build.sh`. This will run front end, api, and database containers. Once all containers are running, you can put localhost:3000 in the browser to see the website. 

####Run Docker Container Services Manually
* Clone the repository
* Go inside the project folder
* `docker build -t frontend www`
* `docker run -p 9000:9000 -d frontend`. In your browser, type in localhost:9000 and you will be able to see front end content. 
* `docker build -t database api/database/postegres`
* `docker run -p 5432:5432 -d database`
* `docker build -t api api`
* `docker run -p 3000:3000 -d api`<br>

