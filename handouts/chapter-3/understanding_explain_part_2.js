// switch to the m201 database
use m201

// enable sharding on the m201 database
sh.enableSharding("m201")

// shard the people collection on the _id index
sh.shardCollection("m201.people", {_id: 1})


// after the import, check the shard distribution (data should be on both shards)
db.people.getShardDistribution()

// checkout the explain output for a sharded collection
db.people.find({"last_name":"Johnson", "address.state":"New York"}).explain("executionStats")

