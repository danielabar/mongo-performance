// execute the following query and collect execution statistics
db.people.find({ "ssn" : "720-38-5636" }).explain("executionStats")

// create an ascending index on ssn
db.people.createIndex( { ssn : 1 } )

// create an explainable object for the people collection
exp = db.people.explain("executionStats")

// execute the same query again (should use an index)
exp.find( { "ssn" : "720-38-5636" } ) 

// execute a new query on the explainable object (can't use the index)
exp.find( { last_name : "Acevedo" } )


// insert a documents with an embedded document
db.examples.insertOne( { _id : 0, subdoc : { indexedField: "value", otherField : "value" } } )
db.examples.insertOne( { _id : 1, subdoc : { indexedField : "wrongValue", otherField : "value" } } )

// create an index using dot-notation
db.examples.createIndex( { "subdoc.indexedField" : 1 } )

// explain a query using dot-notation
db.examples.explain("executionStats").find( { "subdoc.indexedField" : "value" } )