#!/bin/bash
set -eo pipefail

# stop both back and front processes
echo -e "Stopping backend server..."
kill $(lsof -i:8000 | awk '{print $2}' | tail -n +2)
echo -e "Stopping frontend server..."
kill $(lsof -i:8001 | awk '{print $2}' | tail -n +2)
echo -e "Servers stopped."