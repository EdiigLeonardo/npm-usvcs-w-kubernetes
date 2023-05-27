#!/bin/sh
docker network rm tfnet
docker network create tfnet
docker run -d --network tfnet -p3306:3306 --name mariadb --env MARIADB_USER=userx --env MARIADB_PASSWORD=passx --env MARIADB_ROOT_PASSWORD=passx  mariadb:latest
sleep 60
docker cp setupdb.sql mariadb:/tmp/
docker exec -it mariadb sh -c 'mysql -ppassx < /tmp/setupdb.sql'
