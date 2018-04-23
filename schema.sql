DROP DATABASE IF EXISTS Bamazon;

CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE Products (
	ItemID INT AUTO_INCREMENT NOT NULL,
	ProductName VARCHAR(100) NOT NULL,
	DepartmentName VARCHAR(50) NOT NULL,
	Price DECIMAL (10,2) NOT NULL,
	StockQuantity INT(10) NOT NULL,
	primary key(ItemID)
);

select * from Products;

INSERT INTO Products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Adaptogen Blend","HEALTH & WELLNESS",60.00,300),
("Stunner Shades","FASHION",12.50,45),
("Batman Utility Belt","FASHION",500.00,3),
("Lion's Mane Elixir","HEALTH & WELLNESS",45.00,110),
("Ultra Learning Course","EDUCATION",1200.00,23),
("Book of Knowledge","EDUCATION",15.99,55),
("Water Filter","HOME",67.50,80),
("Persian Rug","HOME",137.35,15),
("Rare Artifact","HOME",2000.00,3),
("Martial Arts Value Pack","SPORTS",200.00,17);