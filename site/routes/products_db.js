///// init database /////
var sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('Play.db', sqlite3.OPEN_READWRITE, (err) => {
  if(err) {
    console.error(err.message);
  }
  console.log('Connected to the PLAY database.');
});

/////////////////////////////////////////
/// INIT INITIAL TABLES IF NOT EXISTS ///
/////////////////////////////////////////
exports.createCategoryTable = function(){
  db.seralize(() => {
    db.run("CREATE TABLE IF NOT EXISTS Category ("+
      "categoryId	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE," +
      "categoryName	TEXT NOT NULL UNIQUE," +
      "categoryDescription	TEXT NOT NULL" +
      ");")
  });
}

exports.createProductTable = function(){
  db.seralize(() => {
    db.run("CREATE TABLE IF NOT EXISTS Product ("+
      "productId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE," +
      "productCategory INTEGER NOT NULL," +
      "description TEXT," +
      "name TEXT NOT NULL," +
      "price	INTEGER NOT NULL," +
      "image	TEXT," +
      "FOREIGN KEY(productCategory) REFERENCES Category(categoryId)" +
      ");")
  });
}

exports.createOrderTable = function(){
  db.seralize(() => {
    db.run("CREATE TABLE IF NOT EXISTS Order ("+
      "orderId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE," +
      "userId TEXT NOT NULL," +
      "orderDate TEXT NOT NULL," +
      "orderPrice REAL NOT NULL," +
      "FOREIGN KEY(userId) REFERENCES User(userId)" +
      ");")
  });
}

exports.createOrderDetailsTable = function(){
  db.seralize(() => {
    db.run("CREATE TABLE IF NOT EXISTS OrderDetails ("+
      "orderId	INTEGER NOT NULL," +
      "productId INTERGER NOT NULL," +
      "PRIMARY KEY (orderId, productId)" +
      "FOREIGN KEY(productId) REFERENCES User(productId)," +
      "FOREIGN KEY(orderId) REFERENCES Order(orderId)" +
      ");")
  });
}

/////////////////////////////////////////
///////////// SQL QUERIES ///////////////
/////////////////////////////////////////

//// GET ALL PRODUCTS
/// 'view all products'
exports.getAllProducts = function(callback){
  var query = "SELECT * FROM Product;";
    // use each as all returns everything from db, each runs query first
    db.all(query, (err, rows) =>{
      if(rows){
        callback(null, rows);
      } else{
        callback(error, null); // unable to get products
      }
  });
}

/// GET PRODUCTS BY CATEGORY
/// PARAMETER: categoryId
/// NB: (can store categoryId w/ name? or pass name - get id with another query)
exports.getProductsByCategory = function(categoryId, callback){
  var query = "SELECT * FROM Product WHERE productCategory = ?;";
    // use each as all returns everything from db, each runs query first
    db.all(query, categoryId, (err, rows) =>{
      if(rows){
        callback(null, rows);
      } else{
        callback(error, null); // unable to get products
      }
  });
}

/// GET ALL CATEGORIES
/// 'view all categories'
exports.getAllCategories = function(callback){
  var query = "SELECT * FROM Category;";
    // use each as all returns everything from db, each runs query first
    db.all(query, (err, rows) =>{
      if(rows){
        callback(null, rows);
      } else{
        callback(error, null); // unable to get products
      }
  });
}
