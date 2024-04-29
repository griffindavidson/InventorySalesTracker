CREATE DATABASE IF NOT EXISTS buisness;
USE buisness;

CREATE TABLE IF NOT EXISTS `categories` (
	`id` int NOT NULL,
    `title` varchar(255) default null,
    PRIMARY KEY (`id`)
);
INSERT INTO categories VALUES (0, "exampleCategory");
INSERT INTO categories VALUES (1, "testCategory");
INSERT INTO categories VALUES (2, "Home Furniture");

CREATE TABLE IF NOT EXISTS `customers` (
	`id` int NOT NULL,
    `firstName` varchar(255) default null,
    `lastName` varchar(255) default null,
    `email` varchar(30) default null,
    primary key (`id`)
);
INSERT INTO customers VALUES (9, "John", "Smith", "johnsmith@example.com");
INSERT INTO customers VALUES (10, "Jane", "Doe", "janedoe@example.com");

CREATE TABLE IF NOT EXISTS `suppliers` (
	`id` INT NOT NULL,
    `name` varchar(30) default NULL,
    `email` varchar(255) default NULL,
    `paymentConditions` varchar(255) default NULL,
    primary key (`id`)
);
INSERT INTO suppliers VALUES (1, "SMITH ENGINEERING", "engineering@smith.com", "monthly");

CREATE TABLE IF NOT EXISTS `users` (
	`id` INT NOT NULL,
    `username` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `role` varchar(20) NOT NULL,
    primary key (`id`)
);
INSERT INTO users VALUES (8, "virgiladegra", "123456", "employee");

CREATE TABLE IF NOT EXISTS `inventories` (
	`productID` int NOT NULL,
    `quantity` int NOT NULL,
    `location` varchar(30) NOT NULL,
    primary key (`productID`, `location`)
);
INSERT INTO inventories VALUES (500, 50, "Seattle");
INSERT INTO inventories VALUES (499, 24, "Cupertino");
INSERT INTO inventories VALUES (498, 51, "Reddng");

CREATE TABLE IF NOT EXISTS `products` (
	`id` int NOT NULL,
    `name` varchar(255) default NULL,
    `description` varchar(255) default null,
    `categoryID` int NOT NULL,
    `supplierID` int NOT NULL,
    `price` float NOT NULL,
    primary key (`id`),
    foreign key (`id`) REFERENCES `inventories` (`productID`),
    foreign key (`categoryID`) REFERENCES `categories` (`id`),
    foreign key (`supplierID`) REFERENCES `suppliers` (`id`)
);
INSERT INTO products VALUES (500, "Lamp", "Table Lamp", 2, 1, 9.99);
INSERT INTO products VALUES (499, "Desk", "Nightstand Desk", 2, 1, 14.99);
INSERT INTO products VALUES (498, "Chair", "Desk Chair", 2, 1, 12.99);

CREATE TABLE IF NOT EXISTS `transactions` (
	`id` INT NOT NULL,
    `productID` INT NOT NULL,
    `quantityPurchased` INT NOT NULL,
	`price` FLOAT NOT NULL,
    `dateOfPurchase` varchar(10),
    `customerID` INT NOT NULL,
    primary key (`id`, `productID`),
    foreign key (`productID`) REFERENCES `products` (`id`),
    foreign key (`customerID`) REFERENCES `customers` (`id`)
);
INSERT INTO transactions VALUES (42, 500, 2, 19.98, "2024-04-29", 9);

SELECT categories.id, categories.title, COUNT(products.id) FROM categories LEFT JOIN products ON categories.id = products.categoryID GROUP BY categories.id, categories.title;