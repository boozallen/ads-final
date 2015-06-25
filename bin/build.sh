docker build -t frontend ../www
docker run -p 9000:9000 -d frontend
docker build -t database ../api/database/postegres
docker run -p 5432:5432 -d database
docker build -t api ../api
docker run -p 3000:3000 -d api
