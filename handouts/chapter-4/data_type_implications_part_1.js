// use the m201 database
use m201

// insert a triangle shape
db.shapes.insert( { type: "triangle", side_length_type: "equilateral", base : 10, height: 20   } )

// insert some shapes with varying data types
db.shapes.insert( { type: "triangle", side_length_type: "isosceles", base : NumberDecimal("2.8284271247461903"), side_length: 2   } )
db.shapes.insert( { type: "square", base: 1} )
db.shapes.insert( { type: "rectangle", side: 10, base: 3} )

// will only find documents with a floating point value
db.shapes.find({base: 2.8284271247461903})

// will only find documents with a string data type
db.shapes.find({base: "2.8284271247461903"})

// this time with a NumberDecimal type
db.shapes.find({base: NumberDecimal("2.8284271247461903")})

// sort on varying numerical data types
db.shapes.find({}, {base:1, _id:0}).sort({base:1})

// insert some documents with base having a string data type
db.shapes.insert( { type: "pyramid", apex: 10, base: "3"} )
db.shapes.insert( { type: "pyramid", apex: 10, base: "14"} )

// all string data types will appear at the bottom
db.shapes.find({}, {base:1, _id:0}).sort({base:1})