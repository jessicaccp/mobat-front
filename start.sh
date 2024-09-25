#!/bin/bash

# create logs folder if none
if [ ! -d "logs" ]; then
  mkdir logs
fi
LOGS_DIR=`pwd`/logs

# backend
## update the backend submodule to the latest version
if [ ! -d "mobat_tool" ]; then
  git submodule update --init --recursive
else
  git submodule update --recursive --remote
fi

## install the dependencies using python 3.12
cd mobat_tool
python -m pip install --upgrade pip virtualenv
if [ ! -d "venv" ]; then
  python -m virtualenv -p python3.12 venv
fi
source venv/bin/activate
python -m pip install -r requirements.txt

## run the django server
nohup python -u manage.py runserver 8000 > $LOGS_DIR/back.out 2> $LOGS_DIR/back.err &

# frontend
## get latest changes
cd ..
git pull

## install the dependencies
npm install

## run the react server
nohup npm run dev -- --port 8001 > $LOGS_DIR/front.out 2> $LOGS_DIR/front.err &