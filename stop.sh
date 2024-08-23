#!/bin/bash

# stop both back and front processes
kill $(lsof -i:8000 | awk '{print $2}' | tail -n +2)
kill $(lsof -i:5173 | awk '{print $2}' | tail -n +2)