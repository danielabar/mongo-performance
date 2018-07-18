// switch to the m201 database
use m201

// insert a document into the products collection
db.products.insert({
  productName: "MongoDB Short Sleeve T-Shirt",
  categories: ["T-Shirts", "Clothing", "Apparel"],
  stock: { size: "L", color: "green", quantity: 100 }
});

// create an index on stock.quantity
db.products.createIndex({ "stock.quantity": 1})

// create an explainable object on the products collection
var exp = db.products.explain()

// look at the explain output for the query (uses an index, isMultiKey is false)
exp.find({ "stock.quantity": 100 })

// insert a document where stock is now an array
db.products.insert({
  productName: "MongoDB Long Sleeve T-Shirt",
  categories: ["T-Shirts", "Clothing", "Apparel"],
  stock: [
    { size: "S", color: "red", quantity: 25 },
    { size: "S", color: "blue", quantity: 10 },
    { size: "M", color: "blue", quantity: 50 }
  ]
});

// rerun our same query (still uses an index, but isMultiKey is now true)
exp.find({ "stock.quantity": 100 })

// creating an index on two array fields will fail
db.products.createIndex({ categories: 1, "stock.quantity": 1 })

// but compound indexes with only 1 array field are good
db.products.createIndex({ productName: 1, "stock.quantity": 1 })

// productName can be an array if stock isn't
db.products.insert({
  productName: [
    "MongoDB Short Sleeve T-Shirt",
    "MongoDB Short Sleeve Shirt"
  ],
  categories: ["T-Shirts", "Clothing", "Apparel"],
  stock: { size: "L", color: "green", quantity: 100 }
});

// but this will fail, because both productName and stock are arrays
db.products.insert({
  productName: [
    "MongoDB Short Sleeve T-Shirt",
    "MongoDB Short Sleeve Shirt"
  ],
  categories: ["T-Shirts", "Clothing", "Apparel"],
  stock: [
    { size: "S", color: "red", quantity: 25 },
    { size: "S", color: "blue", quantity: 10 },
    { size: "M", color: "blue", quantity: 50 }
  ]
});