// switch to the m201 database
use m201

// create an explainable object with no parameters
exp = db.people.explain()

// create an explainable object with the 'executionStats' parameter
expRun = db.people.explain("executionStats")

// and one final explainable object with the 'allPlansExecution' parameter
expRunVerbose = db.people.explain("allPlansExecution")

// execute and explain the query, collecting execution statistics
expRun.find({"last_name":"Johnson", "address.state":"New York"})

// create an index on last_name
db.people.createIndex({last_name:1})

// rerun the query (uses the index)
expRun.find({"last_name":"Johnson", "address.state":"New York"})

// create a compound index
db.people.createIndex({"address.state": 1, last_name: 1})

// rerun the query (uses the new index)
expRun.find({"last_name":"Johnson", "address.state":"New York"})

// run a sort query
var res = db.people.find({"last_name":"Johnson", "address.state":"New York"}).sort({"birthday":1}).explain("executionStats")

// checkout the execution stages (doing an in-memory sort)
res.executionStats.executionStages