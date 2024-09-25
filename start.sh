#!/bin/bash
set -eo pipefail

# create logs folder if none
if [ ! -d "logs" ]; then
  echo -e "Creating logs folder..."
  mkdir logs
  echo -e "Logs folder created."
fi
LOGS_DIR=`pwd`/logs

# backend
## update the backend submodule to the latest version
echo -e "Updating backend submodule..."
if [ ! -d "mobat_tool" ]; then
  git submodule update --init --recursive > $LOGS_DIR/back.out 2> $LOGS_DIR/back.err
else
  git submodule update --recursive --remote > $LOGS_DIR/back.out 2> $LOGS_DIR/back.err
fi
echo -e "Backend submodule updated."

## install the dependencies using python 3.12
cd mobat_tool
python -m pip install --upgrade pip virtualenv > $LOGS_DIR/back.out 2> $LOGS_DIR/back.err
if [ ! -d "venv" ]; then
  echo -e "Creating virtual environment..."
  python -m virtualenv -p python3.12 venv > $LOGS_DIR/back.out 2> $LOGS_DIR/back.err
  echo -e "Virtual environment created."
fi
source venv/bin/activate > $LOGS_DIR/back.out 2> $LOGS_DIR/back.err
echo -e "Installing backend dependencies..."
python -m pip install -r requirements.txt > $LOGS_DIR/back.out 2> $LOGS_DIR/back.err
python -m pip install setuptools > $LOGS_DIR/back.out 2> $LOGS_DIR/back.err
echo -e "Backend dependencies installed."

## run the django server
echo -e "Starting backend server..."
nohup python -u manage.py runserver 8000 > $LOGS_DIR/back.out 2> $LOGS_DIR/back.err &
echo -e "\nBackend server running.\n"

## update table migrations
# python manage.py makemigrations table
# python manage.py migrate table
# echo "Table migrations updated."

# frontend
## get latest changes
cd ..
echo -e "Updating frontend repository..."
git pull > $LOGS_DIR/front.out 2> $LOGS_DIR/front.err
echo -e "Frontend repository updated."

## install the dependencies
echo -e "Installing frontend dependencies..."
npm install > $LOGS_DIR/front.out 2> $LOGS_DIR/front.err
echo -e "Frontend dependencies installed."

## run the react server
echo -e "Starting frontend server..."
nohup npm run dev -- --port 8001 > $LOGS_DIR/front.out 2> $LOGS_DIR/front.err &
echo -e "\nFrontend server running.\n"