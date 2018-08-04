var mysql = require("mysql");
var consoleTable = require("console.table");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Connected");
  }

  connection.query("SELECT * FROM products", function(err, result, fields) {
    if (err) {
      console.log(err);
    } else {
      inquirer
        .prompt([
          {
            type: "list",
            name: "option",
            message: "What would you like to do?",
            choices: [
              "View Products for Sale",
              "View Low Inventory",
              "Add to Inventory",
              "Add New Product"
            ]
          }
        ])
        .then(function(man) {
          if (man.option == "View Products for Sale") {
            console.table(result);
            connection.end();
          } else if (man.option == "View Low Inventory") {
            var low = connection.query(
              "SELECT * FROM products WHERE stock_quantity < ?",
              [5],
              function(err, result) {
                for (i = 0; i < result.length; i++) {
                  console.log(result[i].name);
                  console.log(result[i].stock_quantity);
                  console.log("-----------------");
                }
                connection.end();
              }
            );
          } else if(man.option == "Add to Inventory"){
            
          }
        });
    }
  });
});