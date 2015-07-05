for i in  `docker ps -q`; do docker stop $i; done
docker rm `docker ps --no-trunc -aq`
