var mysql = require("mysql");
var consoleTable = require("console.table");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "bamazon_db"
});

var sql = "UPDATE products SET stock_quantity =? WHERE id = ?";

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
      console.table(result);
      inquirer
        .prompt([
          {
            type: "input",
            name: "id",
            message: "What is the id of the item you wish to purchase?"
          },
          {
            type: "input",
            name: "amount",
            message: "How many would you like to buy?(numerical value only)"
          }
        ])
        .then(function(purchase) {
          item = purchase.id;
          quantity = purchase.amount;

          if (
            item == result[item - 1].id &&
            quantity < result[item - 1].stock_quantity
          ) {
            console.log(
              "Your purchase of " + result[item - 1].name + " was successful!"
            );

            var update = connection.query(
              sql,
              [result[item - 1].stock_quantity - quantity, item],
              function(err, result) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Stock updated");
                  //console.log(result);

                  connection.end();
                }
              }
            );
          } else if (quantity > result[item - 1].stock_quantity) {
            console.log(
              "Sorry, it doesnt look like we have enough of that item!"
            );

            connection.end();
          }
        });
    }
  });
});
