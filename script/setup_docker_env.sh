#!/usr/bin/bash
SCRIPT=$(pwd $0)

docker pull mongo
docker run -d -p 27017:27017 --name mongo mongo:latest
docker start mongo