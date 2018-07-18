#!/usr/bin/env bash

# import the people dataset
mongoimport -d m201 -c people --drop people.json

# connect to the m201 database
mongo m201