#!/bin/bash
REPOSITORY=/home/ubuntu/build
APP_NAME=node_app

cd $REPOSITORY

sudo yarn install

# Check if the app is already running
if pm2 list | grep $APP_NAME > /dev/null
then
  echo "$APP_NAME is already running. Restarting..."
  sudo pm2 restart $APP_NAME
else
  echo "Starting $APP_NAME"
  sudo pm2 start dist/app.js --name $APP_NAME
fi