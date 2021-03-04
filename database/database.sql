SET @today_date = CURRENT_DATE(), @today_date_time = CURRENT_TIMESTAMP();

CREATE TABLE drug_table (
	drug_id INT NOT NULL AUTO_INCREMENT,
	supplier_name VARCHAR(100) NOT NULL,
	drug_name VARCHAR(100) NOT NULL,
	purchase_price INT NOT NULL,
	selling_price INT NOT NULL,
	available TINYINT NOT NULL,
	PRIMARY KEY (drug_id)
);

INSERT INTO drug_table 
VALUES 
	(null,"KASIA FARMA","ABBOCATH 18",5000,6000,1),
	(null,"KASIA FARMA","BECOM-C",7000,8000,1),
	(null,"KASIA FARMA","CANDISTIN DROP",2000,4000,1),
	(null,"KASIA FARMA","DAMABEN SYR",10000,12000,1),
	(null,"KASIA FARMA","ELKANA SYR 60ML",12000,13000,1),
	(null,"KASIA FARMA","GELIGA BALSAM 20GR",20000,22000,1),
	(null,"KASIA FARMA","HANSAPLAST JUMBO",7500,8000,1),
	(null,"KASIA FARMA","HILO VANILA 200 GR",9000,15000,1),
	(null,"KASIA FARMA","GRAHABION TAB",11000,13000,1),
	(null,"KASIA FARMA","FRISIAN UHT190 COBLS",14000,15000,1),
	(null,"KASIA FARMA","ETTAWA SUSU KAMBING",16000,17000,1);

CREATE TABLE user_table (
	user_id INT NOT NULL AUTO_INCREMENT,
	full_name VARCHAR(50),
	username VARCHAR(30),
	password VARCHAR(30),
	status ENUM('SELLER','APOTEKER','ADMIN') NOT NULL,
	available TINYINT NOT NULL,
	PRIMARY KEY (user_id)
);

INSERT INTO user_table 
VALUES 
	(null,"admin","admin","admin","ADMIN",1),
	(null,"seller1","seller1","seller1","SELLER",1),
	(null,"apoteker1","apoteker1","apoteker1","APOTEKER",1);

CREATE TABLE stock_table (
	stock_id INT NOT NULL AUTO_INCREMENT,
	drug_id INT NOT NULL,
	stock_date DATE,
	stock INT NOT NULL,
	PRIMARY KEY (stock_id),
	FOREIGN KEY (drug_id) REFERENCES drug_table (drug_id) ON DELETE CASCADE
);

INSERT INTO stock_table 
VALUES 
	(null,1,@today_date,0),
	(null,2,@today_date,0),
	(null,3,@today_date,0),
	(null,4,@today_date,0),
	(null,5,@today_date,0),
	(null,6,@today_date,0),
	(null,7,@today_date,0),
	(null,8,@today_date,0),
	(null,9,@today_date,0),
	(null,10,@today_date,0),
	(null,11,@today_date,0);

CREATE VIEW stock_view AS SELECT
	stock_table.stock_id,
	stock_table.stock_date AS date,
	DAY(stock_table.stock_date) AS day,
	MONTH(stock_table.stock_date) AS month,
	YEAR(stock_table.stock_date) AS year,
	stock_table.stock,
	drug_table.drug_id,
	drug_table.supplier_name,
	drug_table.drug_name,
	drug_table.purchase_price,
	drug_table.selling_price,
	drug_table.available 
FROM stock_table 
INNER JOIN drug_table 
ON stock_table.drug_id=drug_table.drug_id 
ORDER BY drug_table.drug_name ASC;

CREATE TABLE mutation_table (
	mutation_id INT NOT NULL AUTO_INCREMENT,
	drug_id INT NOT NULL,
	mutation_date DATE NOT NULL,
	PRIMARY KEY (mutation_id),
	FOREIGN KEY (drug_id) REFERENCES drug_table (drug_id) ON DELETE CASCADE
);

INSERT INTO mutation_table 
VALUES 
	(null,1,@today_date),
	(null,2,@today_date),
	(null,3,@today_date),
	(null,4,@today_date),
	(null,5,@today_date),
	(null,6,@today_date),
	(null,7,@today_date),
	(null,8,@today_date),
	(null,9,@today_date),
	(null,10,@today_date),
	(null,11,@today_date);

-- DROP TABLE IF EXISTS "mutation_in_table";
CREATE TABLE mutation_in_table (
	mutation_in_id INT NOT NULL AUTO_INCREMENT,
	mutation_id INT NOT NULL,
	mutation_date_time DATETIME NOT NULL,
	mutation_in INT NOT NULL,
	PRIMARY KEY (mutation_in_id),
	FOREIGN KEY (mutation_id) REFERENCES mutation_table (mutation_id) ON DELETE CASCADE
);

CREATE VIEW mutation_in_view AS SELECT 
	mutation_in_table.mutation_in_id,
	DATE(mutation_in_table.mutation_date_time) AS date,
	DAY(mutation_in_table.mutation_date_time) AS day,
	MONTH(mutation_in_table.mutation_date_time) AS month,
	YEAR(mutation_in_table.mutation_date_time) AS year,
	TIME(mutation_in_table.mutation_date_time) AS time,
	HOUR(mutation_in_table.mutation_date_time) AS hour,
	MINUTE(mutation_in_table.mutation_date_time) AS minute,
	SECOND(mutation_in_table.mutation_date_time) AS second,
	mutation_in_table.mutation_in,
	mutation_table.mutation_id, 
	drug_table.drug_id 
FROM mutation_in_table 
INNER JOIN mutation_table 
ON mutation_in_table.mutation_id=mutation_table.mutation_id 
INNER JOIN drug_table 
ON mutation_table.drug_id=drug_table.drug_id 
GROUP BY mutation_in_table.mutation_in_id;

CREATE TABLE mutation_out_table (
	mutation_out_id INT NOT NULL AUTO_INCREMENT,
	mutation_id INT NOT NULL,
	mutation_date_time DATETIME NOT NULL,
	mutation_out INT NOT NULL,
	PRIMARY KEY (mutation_out_id),
	FOREIGN KEY (mutation_id) REFERENCES mutation_table (mutation_id) ON DELETE CASCADE
);

CREATE VIEW mutation_view AS SELECT 
	mutation_table.mutation_id,
	mutation_table.mutation_date AS date,
	DAY(mutation_table.mutation_date) AS day,
	MONTH(mutation_table.mutation_date) AS month,
	YEAR(mutation_table.mutation_date) AS year,
	COALESCE(SUM(mutation_in_table.mutation_in),0) AS stock_in,
	COALESCE(SUM(mutation_out_table.mutation_out),0) AS stock_out,
	drug_table.drug_id,
	drug_table.supplier_name, 
	drug_table.drug_name, 
	drug_table.available, 
	stock_table.stock 
FROM mutation_table 
LEFT JOIN mutation_in_table 
ON mutation_in_table.mutation_id=mutation_table.mutation_id 
LEFT JOIN mutation_out_table 
ON mutation_out_table.mutation_id=mutation_table.mutation_id 
INNER JOIN drug_table 
ON drug_table.drug_id=mutation_table.drug_id 
INNER JOIN stock_table 
ON (stock_table.drug_id=mutation_table.drug_id AND stock_table.stock_date=mutation_table.mutation_date) 
GROUP BY mutation_table.mutation_id;

CREATE TABLE sales_table (
	sales_id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	sales_date_time DATETIME NOT NULL,
	payment BIGINT NOT NULL,
	back_money BIGINT NOT NULL,
	total_price INT NOT NULL,
	transaction_number CHAR(14) NOT NULL COMMENT 'yyyymmddhhmmss',
	PRIMARY KEY (sales_id),
	FOREIGN KEY (user_id) REFERENCES user_table (user_id)
);

CREATE VIEW sales_view AS SELECT
	sales_table.sales_id,
	DATE(sales_table.sales_date_time) AS date,
	DAY(sales_table.sales_date_time) AS day,
	MONTH(sales_table.sales_date_time) AS month,
	YEAR(sales_table.sales_date_time) AS year,
	TIME(sales_table.sales_date_time) AS time,
	SECOND(sales_table.sales_date_time) AS second,
	MINUTE(sales_table.sales_date_time) AS minute,
	HOUR(sales_table.sales_date_time) AS hour,
	sales_table.payment,
	sales_table.back_money,
	sales_table.total_price,
	sales_table.transaction_number,
	user_table.user_id,
	user_table.username, 
	user_table.status  
FROM sales_table 
INNER JOIN user_table 
ON sales_table.user_id=user_table.user_id 
ORDER BY sales_table.sales_id DESC;

CREATE TABLE sales_detail_table (
	sales_detail_id INT NOT NULL AUTO_INCREMENT,
	sales_id INT NOT NULL,
	drug_id INT NOT NULL,
	quantity INT NOT NULL,
	price BIGINT NOT NULL,
	total_price BIGINT NOT NULL,
	PRIMARY KEY (sales_detail_id),
	FOREIGN KEY (sales_id) REFERENCES sales_table (sales_id) ON DELETE CASCADE,
	FOREIGN KEY (drug_id) REFERENCES drug_table (drug_id)
);

CREATE VIEW sales_detail_view AS SELECT
	sales_detail_table.sales_detail_id,
	sales_detail_table.quantity,
	sales_detail_table.price,
	sales_detail_table.total_price,
	sales_table.sales_id,
	drug_table.drug_id,
	drug_table.supplier_name, 
	drug_table.drug_name, 
	drug_table.purchase_price, 
	drug_table.selling_price, 
	drug_table.available  
FROM sales_detail_table 
INNER JOIN sales_table 
ON sales_detail_table.sales_id=sales_table.sales_id 
INNER JOIN drug_table 
ON sales_detail_table.drug_id=drug_table.drug_id 
ORDER BY sales_detail_table.sales_detail_id ASC;

CREATE TABLE drug_adding_table (
	drug_adding_id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	drug_id INT NOT NULL,
	drug_adding_date_time DATETIME NOT NULL,
	supplier_name VARCHAR(100) NOT NULL COMMENT 'Nama Supplier Ketika Menambah Data',
	drug_name VARCHAR(100) NOT NULL COMMENT 'Nama Ketika Menambah Data',
	purchase_price INT NOT NULL COMMENT 'Harga Beli Ketika Menambah Data',
	selling_price INT NOT NULL COMMENT 'Harga Jual Ketika Menambah Data',
	PRIMARY KEY (drug_adding_id),
	FOREIGN KEY (user_id) REFERENCES user_table (user_id),
	FOREIGN KEY (drug_id) REFERENCES drug_table (drug_id) ON DELETE CASCADE
);

INSERT INTO drug_adding_table 
VALUES 
	(null,1,1,@today_date_time,"KASIA FARMA","ABBOCATH 18",5000,6000),
	(null,1,2,@today_date_time,"KASIA FARMA","BECOM-C",7000,8000),
	(null,1,3,@today_date_time,"KASIA FARMA","CANDISTIN DROP",2000,4000),
	(null,1,4,@today_date_time,"KASIA FARMA","DAMABEN SYR",10000,12000),
	(null,1,5,@today_date_time,"KASIA FARMA","ELKANA SYR 60ML",12000,13000),
	(null,1,6,@today_date_time,"KASIA FARMA","GELIGA BALSAM 20GR",20000,22000),
	(null,1,7,@today_date_time,"KASIA FARMA","HANSAPLAST JUMBO",7500,8000),
	(null,1,8,@today_date_time,"KASIA FARMA","HILO VANILA 200 GR",9000,15000),
	(null,1,9,@today_date_time,"KASIA FARMA","GRAHABION TAB",11000,13000),
	(null,1,10,@today_date_time,"KASIA FARMA","FRISIAN UHT190 COBLS",14000,15000),
	(null,1,11,@today_date_time,"KASIA FARMA","ETTAWA SUSU KAMBING",16000,17000);

CREATE VIEW drug_adding_view AS SELECT 
	drug_adding_table.drug_adding_id, 
	DATE(drug_adding_table.drug_adding_date_time) AS date, 
	DAY(drug_adding_table.drug_adding_date_time) AS day, 
	MONTH(drug_adding_table.drug_adding_date_time) AS month, 
	YEAR(drug_adding_table.drug_adding_date_time) AS year, 
	TIME(drug_adding_table.drug_adding_date_time) AS time, 
	HOUR(drug_adding_table.drug_adding_date_time) AS hour, 
	MINUTE(drug_adding_table.drug_adding_date_time) AS minute, 
	SECOND(drug_adding_table.drug_adding_date_time) AS second, 
	drug_adding_table.supplier_name AS supplier_name_when_adding, 
	drug_adding_table.drug_name AS drug_name_when_adding, 
	drug_adding_table.purchase_price AS purchase_price_when_adding, 
	drug_adding_table.selling_price AS selling_price_when_adding, 
	drug_table.drug_id, 
	drug_table.supplier_name AS supplier_name_currently, 
	drug_table.drug_name AS drug_name_currently, 
	drug_table.purchase_price AS purchase_price_currently, 
	drug_table.selling_price AS selling_price_currently, 
	user_table.user_id, 
	user_table.username, 
	user_table.status 
FROM drug_adding_table 
INNER JOIN drug_table 
ON drug_adding_table.drug_id=drug_table.drug_id 
INNER JOIN user_table 
ON drug_adding_table.user_id=user_table.user_id 
ORDER BY drug_adding_table.drug_adding_id ASC;

CREATE TABLE drug_updating_table (
	drug_updating_id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	drug_id INT NOT NULL,
	drug_updating_date_time DATETIME NOT NULL,
	supplier_name_previously VARCHAR(100) NOT NULL,
	supplier_name_afterward VARCHAR(100) NOT NULL,
	drug_name_previously VARCHAR(100) NOT NULL,
	drug_name_afterward VARCHAR(100) NOT NULL,
	purchase_price_previously BIGINT NOT NULL,
	purchase_price_afterward BIGINT NOT NULL,
	selling_price_previously BIGINT NOT NULL,
	selling_price_afterward BIGINT NOT NULL,
	PRIMARY KEY (drug_updating_id),
	FOREIGN KEY (user_id) REFERENCES user_table (user_id),
	FOREIGN KEY (drug_id) REFERENCES drug_table (drug_id)
);

CREATE VIEW drug_updating_view AS SELECT 
	drug_updating_table.drug_updating_id, 
	DATE(drug_updating_table.drug_updating_date_time) AS date, 
	DAY(drug_updating_table.drug_updating_date_time) AS day, 
	MONTH(drug_updating_table.drug_updating_date_time) AS month, 
	YEAR(drug_updating_table.drug_updating_date_time) AS year, 
	TIME(drug_updating_table.drug_updating_date_time) AS time, 
	HOUR(drug_updating_table.drug_updating_date_time) AS hour, 
	MINUTE(drug_updating_table.drug_updating_date_time) AS minute, 
	SECOND(drug_updating_table.drug_updating_date_time) AS second, 
	drug_updating_table.supplier_name_previously, 
	drug_updating_table.supplier_name_afterward, 
	drug_updating_table.drug_name_previously, 
	drug_updating_table.drug_name_afterward, 
	drug_updating_table.purchase_price_previously, 
	drug_updating_table.purchase_price_afterward, 
	drug_updating_table.selling_price_previously, 
	drug_updating_table.selling_price_afterward, 
	drug_table.drug_id, 
	drug_table.supplier_name AS supplier_name_currently, 
	drug_table.drug_name AS drug_name_currently, 
	drug_table.purchase_price AS purchase_price_currently, 
	drug_table.selling_price AS selling_price_currently, 
	user_table.user_id, 
	user_table.username, 
	user_table.status 
FROM drug_updating_table 
INNER JOIN drug_table 
ON drug_updating_table.drug_id=drug_table.drug_id 
INNER JOIN user_table 
ON drug_updating_table.user_id=user_table.user_id 
ORDER BY drug_updating_table.drug_updating_id ASC;


CREATE TABLE drug_deleting_table (
	drug_deleting_id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	drug_id INT NOT NULL,
	drug_deleting_date_time DATETIME NOT NULL,
	PRIMARY KEY (drug_deleting_id),
	FOREIGN KEY (user_id) REFERENCES user_table (user_id),
	FOREIGN KEY (drug_id) REFERENCES drug_table (drug_id)
);

CREATE VIEW drug_deleting_view AS SELECT 
	drug_deleting_table.drug_deleting_id, 
	DATE(drug_deleting_table.drug_deleting_date_time) AS date, 
	DAY(drug_deleting_table.drug_deleting_date_time) AS day, 
	MONTH(drug_deleting_table.drug_deleting_date_time) AS month, 
	YEAR(drug_deleting_table.drug_deleting_date_time) AS year, 
	TIME(drug_deleting_table.drug_deleting_date_time) AS time, 
	HOUR(drug_deleting_table.drug_deleting_date_time) AS hour, 
	MINUTE(drug_deleting_table.drug_deleting_date_time) AS minute, 
	SECOND(drug_deleting_table.drug_deleting_date_time) AS second, 
	drug_table.drug_id, 
	drug_table.supplier_name, 
	drug_table.drug_name, 
	drug_table.purchase_price, 
	drug_table.selling_price, 
	user_table.user_id, 
	user_table.username, 
	user_table.status 
FROM drug_deleting_table 
INNER JOIN drug_table 
ON drug_deleting_table.drug_id=drug_table.drug_id 
INNER JOIN user_table 
ON drug_deleting_table.user_id=user_table.user_id 
ORDER BY drug_deleting_table.drug_deleting_id ASC;

CREATE TABLE drug_supplying_table (
	drug_supplying_id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	drug_id INT NOT NULL,
	drug_supplying_date_time DATETIME NOT NULL,
	supplier_name VARCHAR(100) NOT NULL COMMENT 'Nama Supplier Ketika Menyuplai Data',
	drug_name VARCHAR(100) NOT NULL COMMENT 'Nama Ketika Menyuplai Data',
	purchase_price INT NOT NULL COMMENT 'Harga Beli Ketika Menyuplai Data',
	selling_price INT NOT NULL COMMENT 'Harga Jual Ketika Menyuplai Data',
	stock INT NOT NULL COMMENT 'Stock Ketika Menyuplai Data',
	supply INT NOT NULL,
	PRIMARY KEY (drug_supplying_id),
	FOREIGN KEY (user_id) REFERENCES user_table (user_id),
	FOREIGN KEY (drug_id) REFERENCES drug_table (drug_id)
);

CREATE VIEW drug_supplying_view AS SELECT 
	drug_supplying_table.drug_supplying_id, 
	DATE(drug_supplying_table.drug_supplying_date_time) AS date, 
	DAY(drug_supplying_table.drug_supplying_date_time) AS day, 
	MONTH(drug_supplying_table.drug_supplying_date_time) AS month, 
	YEAR(drug_supplying_table.drug_supplying_date_time) AS year, 
	TIME(drug_supplying_table.drug_supplying_date_time) AS time, 
	HOUR(drug_supplying_table.drug_supplying_date_time) AS hour, 
	MINUTE(drug_supplying_table.drug_supplying_date_time) AS minute, 
	SECOND(drug_supplying_table.drug_supplying_date_time) AS second, 
	drug_supplying_table.supplier_name AS supplier_name_when_supplying, 
	drug_supplying_table.drug_name AS drug_name_when_supplying, 
	drug_supplying_table.purchase_price AS purchase_price_when_supplying, 
	drug_supplying_table.selling_price AS selling_price_when_supplying, 
	drug_supplying_table.stock AS stock_when_supplying,
	drug_supplying_table.supply,  
	drug_table.drug_id, 
	drug_table.supplier_name AS supplier_name_currently, 
	drug_table.drug_name AS drug_name_currently, 
	drug_table.purchase_price AS purchase_price_currently, 
	drug_table.selling_price AS selling_price_currently, 
	user_table.user_id, 
	user_table.username, 
	user_table.status 
FROM drug_supplying_table 
INNER JOIN drug_table 
ON drug_supplying_table.drug_id=drug_table.drug_id 
INNER JOIN user_table 
ON drug_supplying_table.user_id=user_table.user_id 
ORDER BY drug_supplying_table.drug_supplying_id ASC;

CREATE TABLE update_data_table (
	update_data_id INT NOT NULL AUTO_INCREMENT,
	update_data_date DATE NOT NULL,
	PRIMARY KEY (update_data_id)
);

INSERT INTO update_data_table 
VALUES 
	(null,@today_date);