#!/usr/bin/bash
SCRIPT=$(pwd $0)

docker pull mongo
# docker pull redis

docker run -d -p 27017:27017 --name mongo mongo:latest
# docker run -d -p 6379:6379 --name redis redis:latest

bash "${SCRIPT}"/script/run_docker_env.sh