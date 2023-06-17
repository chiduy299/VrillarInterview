#!/bin/bash
ROOT_PATH=`pwd`
echo "Running from ${ROOT_PATH}"
bash script/setup_docker_env.sh
yarn install
yarn dev-start