#!/bin/bash

# check if there is the back-end directory,
# if not, clone the github repository,
# then proceed to pull the latest changes,
# install the dependencies and run the server
cd ..
if [ ! -d "mobat_tool" ]; then
  git clone git@github.com:jessicaccp/mobat_tool.git
fi
cd mobat_tool
git pull
python -m pip install --upgrade pip
if [ ! -d "venv" ]; then
  python -m pip install virtualenv
  python -m virtualenv venv
fi
source venv/bin/activate
python -m pip install -r requirements.txt
nohup python -u manage.py runserver 8000 > back.out 2> back.err &

# get back to the front-end directory,
# pull the latest changes,
# install the dependencies and run the server
cd ../mobat-front
git pull
npm install
nohup npm run dev -- --port 5173 > front.out 2> front.err &