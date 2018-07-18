// explain a range query (using an index)
exp.find( { ssn : { $gte : "555-00-0000", $lt : "556-00-0000" } } )

// explain a query on a set of values
exp.find( { "ssn" : { $in : [ "001-29-9184", "177-45-0950", "265-67-9973" ] } } )

// explain a query where only part of the predicates use a index
exp.find( { "ssn" : { $in : [ "001-29-9184", "177-45-0950", "265-67-9973" ] }, last_name : { $gte : "H" } } )