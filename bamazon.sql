-- Drops the bamazon_db if one already exists
DROP DATABASE IF EXISTS bamazon_db;
-- Create the bamazon database
CREATE DATABASE bamazon_db;

-- Make sure we use the bamazon database
USE bamazon_db;

CREATE TABLE products (
    id INTEGER(1) AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    department VARCHAR(30),
    price INTEGER(10) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ('Blade Runner 2049', 'Movies', 23, 10);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ('Interstellar', 'Movies', 10, 7);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ('Dunkirk', 'Movies', 25, 26);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ('The Martian', 'Movies', 10, 12);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ('Overwatch', 'Video Games', 40, 19);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ('Battlefield 5', 'Video Games', 60, 99);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ('Final Fantasy 15', 'Video Games', 20, 11);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ('Death Stranding', 'Video Games', 60, 99);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ('The little book of Hygge', 'Books', 14, 23);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ('Artemis', 'Books', 17, 19);







