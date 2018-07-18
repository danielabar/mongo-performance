#!/usr/bin/env bash

# start a mongod
mongod --dbpath /data/db --fork --logpath /data/db/mongodb.log

# immediately shut down the server
mongo admin --eval 'db.shutdownServer()'

# checkout the server's data files
ls /data/db


# remove the folder and recreate it
rm -rf /data/db
mkdir -p /data/db

# this time, start the server with the --directoryperdb option
mongod --dbpath /data/db --fork --logpath /data/db/mongodb.log --directoryperdb

# write a single document into the 'hello' database
mongo hello --eval 'db.a.insert({a:1}, {writeConcern: {w:1, j:true}})' 

# then, shutdown the server
mongo admin --eval 'db.shutdownServer()'

# checkout the server's data files
ls /data/db

# checkout the hello collection's data/index file(s)
ls /data/db/hello


# this time, start the server with the --directoryperdb and
# --wiredTigerDirectoryForIndexes options
mongod --dbpath /data/db --fork --logpath /data/db/mongodb.log \
       --directoryperdb --wiredTigerDirectoryForIndexes

# write a single document into the 'hello' database
mongo hello --eval 'db.a.insert({a:1}, {writeConcern: {w:1, j:true}})' 

# then, shutdown the server
mongo admin --eval 'db.shutdownServer()'

# checkout the server's data files
ls /data/db

# checkout the hello collection's data/index folder(s)
ls /data/db/hello


# checkout the journal directory
ls /data/db/journal