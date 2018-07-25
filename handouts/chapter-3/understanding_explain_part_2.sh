#!/usr/bin/env bash

# use mlaunch from mtools to startup a sharded cluster
mlaunch init --single --sharded 2


# after sharding the collection, import some documents
mongoimport -d m201 -c people people.json