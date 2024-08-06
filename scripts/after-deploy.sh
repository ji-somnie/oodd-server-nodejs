#!/bin/bash
REPOSITORY=/home/ubuntu/build

cd $REPOSITORY

sudo yarn install

sudo pm2 start dist/app.js --name node_app