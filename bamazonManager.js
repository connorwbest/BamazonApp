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
  if (error) throw error;
  else {
    manSelect();
  }
});

function manSelect() {
  inquirer
    .prompt([
      {
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ]
      }
    ])
    .then(function(answer) {
      if (answer.action == "View Products for Sale") {
        viewProducts();
      } else if (answer.action == "View Low Inventory") {
        lowInv();
      } else if (answer.action == "Add to Inventory") {
        addInv();
      } else if (answer.action == "Add New Product") {
        addProd();
      }
    });
}

function viewProducts() {
  connection.query("SELECT * FROM products", function(err, result, fields) {
    if (err) throw err;
    console.table(result);
    manSelect();
  });
}

function lowInv() {
  var low = connection.query(
    "SELECT * FROM products WHERE stock_quantity < ?",
    [5],
    function(err, result) {
      for (i = 0; i < result.length; i++) {
        console.log(result[i].name);
        console.log(result[i].stock_quantity);
        console.log("-----------------");
      }
      manSelect();
    }
  );
}

function addInv() {

  inquirer
    .prompt([
      {
        type: "input",
        name: "item",
        message: "What is the ID of the item you would like to update stock for?"
      },
      {
        type: "input",
        name: "amount",
        message: "What should the new stock amount be?"
      }
    ]).then(function(answer) {

        var query = connection.query(
        "UPDATE products SET ? WHERE id=?",
        [{stock_quantity: answer.amount},answer.item],
        function(err, result) {
            if (err) throw err
            else {
                console.log('Stock quantity has been updated');
            }
        }
      );
    });
}

function addProd() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "item",
        message: "What is the name of the product you would like to add?"
      },
      {
        type: "list",
        name: "department",
        message: "What department should it be listed under?",
        choices: ["Movies", "Video Games", "Books"]
      },
      {
        type: "input",
        name: "price",
        message: "What is the price?"
      },
      {
        type: "input",
        name: "quantity",
        message: "How many would you like to add?"
      }
    ])
    .then(function(answer) {
      var query = connection.query(
        "INSERT INTO products SET ?",
        {
          name: answer.item,
          department: answer.department,
          price: answer.price,
          stock_quantity: answer.quantity
        },
        function(err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log(
              answer.quantity +
                " of " +
                answer.item +
                " has been added to the store."
            );
          }
        }
      );
    });
}
