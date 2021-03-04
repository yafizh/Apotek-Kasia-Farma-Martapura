

DROP TABLE IF EXISTS `drug_adding_table`;CREATE TABLE `drug_adding_table` (
  `drug_adding_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `drug_id` int(11) NOT NULL,
  `supplier_name` varchar(100) NOT NULL COMMENT 'Nama Supplier Ketika Menambah Data',
  `drug_name` varchar(100) NOT NULL COMMENT 'Nama Ketika Menambah Data',
  `purchase_price` int(11) NOT NULL COMMENT 'Harga Beli Ketika Menambah Data',
  `selling_price` int(11) NOT NULL COMMENT 'Harga Jual Ketika Menambah Data',
  `stock` int(11) NOT NULL COMMENT 'Stock Ketika Menambah Data',
  `drug_adding_date_time` datetime NOT NULL,
  PRIMARY KEY (`drug_adding_id`),
  KEY `user_id` (`user_id`),
  KEY `drug_id` (`drug_id`),
  CONSTRAINT `drug_adding_table_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`user_id`),
  CONSTRAINT `drug_adding_table_ibfk_2` FOREIGN KEY (`drug_id`) REFERENCES `drug_table` (`drug_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;


INSERT INTO drug_adding_table VALUES
('4','1','4','KASIA','BODREX','500','1000','5','2021-01-23 16:03:43'),
('5','1','5','FARMA','PROMAG','6000','8000','10','2021-01-23 16:03:55');




DROP TABLE IF EXISTS `drug_deleting_table`;CREATE TABLE `drug_deleting_table` (
  `drug_deleting_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `drug_id` int(11) NOT NULL,
  `drug_deleting_date_time` datetime NOT NULL,
  PRIMARY KEY (`drug_deleting_id`),
  KEY `user_id` (`user_id`),
  KEY `drug_id` (`drug_id`),
  CONSTRAINT `drug_deleting_table_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`user_id`),
  CONSTRAINT `drug_deleting_table_ibfk_2` FOREIGN KEY (`drug_id`) REFERENCES `drug_table` (`drug_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;






DROP TABLE IF EXISTS `drug_supplying_table`;CREATE TABLE `drug_supplying_table` (
  `drug_supplying_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `drug_id` int(11) NOT NULL,
  `supplier_name` varchar(100) NOT NULL COMMENT 'Nama Supplier Ketika Menyuplai Data',
  `drug_name` varchar(100) NOT NULL COMMENT 'Nama Ketika Menyuplai Data',
  `purchase_price` int(11) NOT NULL COMMENT 'Harga Beli Ketika Menyuplai Data',
  `selling_price` int(11) NOT NULL COMMENT 'Harga Jual Ketika Menyuplai Data',
  `stock` int(11) NOT NULL COMMENT 'Stock Ketika Menyuplai Data',
  `supply` int(11) NOT NULL,
  `drug_supplying_date_time` datetime NOT NULL,
  PRIMARY KEY (`drug_supplying_id`),
  KEY `user_id` (`user_id`),
  KEY `drug_id` (`drug_id`),
  CONSTRAINT `drug_supplying_table_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`user_id`),
  CONSTRAINT `drug_supplying_table_ibfk_2` FOREIGN KEY (`drug_id`) REFERENCES `drug_table` (`drug_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;






DROP TABLE IF EXISTS `drug_table`;CREATE TABLE `drug_table` (
  `drug_id` int(11) NOT NULL AUTO_INCREMENT,
  `supplier_name` varchar(100) NOT NULL,
  `drug_name` varchar(100) NOT NULL,
  `purchase_price` int(11) NOT NULL,
  `selling_price` int(11) NOT NULL,
  `available` tinyint(4) NOT NULL,
  PRIMARY KEY (`drug_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;


INSERT INTO drug_table VALUES
('4','KASIA','BODREX','500','1000','1'),
('5','FARMA','PROMAG','6000','8000','1');




DROP TABLE IF EXISTS `drug_updating_table`;CREATE TABLE `drug_updating_table` (
  `drug_updating_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `drug_id` int(11) NOT NULL,
  `supplier_name_previously` varchar(100) NOT NULL,
  `supplier_name_afterward` varchar(100) NOT NULL,
  `drug_name_previously` varchar(100) NOT NULL,
  `drug_name_afterward` varchar(100) NOT NULL,
  `purchase_price_previously` bigint(20) NOT NULL,
  `purchase_price_afterward` bigint(20) NOT NULL,
  `selling_price_previously` bigint(20) NOT NULL,
  `selling_price_afterward` bigint(20) NOT NULL,
  `drug_updating_date_time` datetime NOT NULL,
  PRIMARY KEY (`drug_updating_id`),
  KEY `user_id` (`user_id`),
  KEY `drug_id` (`drug_id`),
  CONSTRAINT `drug_updating_table_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`user_id`),
  CONSTRAINT `drug_updating_table_ibfk_2` FOREIGN KEY (`drug_id`) REFERENCES `drug_table` (`drug_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;






DROP TABLE IF EXISTS `mutation_in_table`;CREATE TABLE `mutation_in_table` (
  `mutation_in_id` int(11) NOT NULL AUTO_INCREMENT,
  `mutation_id` int(11) NOT NULL,
  `mutation_date_time` datetime NOT NULL,
  `mutation_in` int(11) NOT NULL,
  PRIMARY KEY (`mutation_in_id`),
  KEY `mutation_id` (`mutation_id`),
  CONSTRAINT `mutation_in_table_ibfk_1` FOREIGN KEY (`mutation_id`) REFERENCES `mutation_table` (`mutation_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;


INSERT INTO mutation_in_table VALUES
('12','4','2021-01-23 16:03:43','5'),
('13','5','2021-01-23 16:03:55','10');




DROP TABLE IF EXISTS `mutation_out_table`;CREATE TABLE `mutation_out_table` (
  `mutation_out_id` int(11) NOT NULL AUTO_INCREMENT,
  `mutation_id` int(11) NOT NULL,
  `mutation_date_time` datetime NOT NULL,
  `mutation_out` int(11) NOT NULL,
  PRIMARY KEY (`mutation_out_id`),
  KEY `mutation_id` (`mutation_id`),
  CONSTRAINT `mutation_out_table_ibfk_1` FOREIGN KEY (`mutation_id`) REFERENCES `mutation_table` (`mutation_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;






DROP TABLE IF EXISTS `mutation_table`;CREATE TABLE `mutation_table` (
  `mutation_id` int(11) NOT NULL AUTO_INCREMENT,
  `drug_id` int(11) NOT NULL,
  `mutation_date` date NOT NULL,
  PRIMARY KEY (`mutation_id`),
  KEY `drug_id` (`drug_id`),
  CONSTRAINT `mutation_table_ibfk_1` FOREIGN KEY (`drug_id`) REFERENCES `drug_table` (`drug_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;


INSERT INTO mutation_table VALUES
('4','4','2021-01-23'),
('5','5','2021-01-23');




DROP TABLE IF EXISTS `mutation_view`;CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `mutation_view` AS select `mutation_table`.`mutation_id` AS `mutation_id`,`mutation_table`.`mutation_date` AS `mutation_date`,coalesce(sum(distinct `mutation_in_table`.`mutation_in`),0) AS `stock_in`,coalesce(sum(distinct `mutation_out_table`.`mutation_out`),0) AS `stock_out`,`drug_table`.`drug_id` AS `drug_id`,`drug_table`.`drug_name` AS `drug_name` from (((`mutation_table` left join `mutation_in_table` on(`mutation_in_table`.`mutation_id` = `mutation_table`.`mutation_id`)) left join `mutation_out_table` on(`mutation_out_table`.`mutation_id` = `mutation_table`.`mutation_id`)) join `drug_table` on(`drug_table`.`drug_id` = `mutation_table`.`drug_id`)) group by `mutation_table`.`mutation_id`;


INSERT INTO mutation_view VALUES
('4','2021-01-23','5','0','4','BODREX'),
('5','2021-01-23','10','0','5','PROMAG');




DROP TABLE IF EXISTS `sales_detail_table`;CREATE TABLE `sales_detail_table` (
  `sales_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `sales_id` int(11) NOT NULL,
  `drug_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` bigint(20) NOT NULL,
  `price_total` bigint(20) NOT NULL,
  PRIMARY KEY (`sales_detail_id`),
  KEY `sales_id` (`sales_id`),
  KEY `drug_id` (`drug_id`),
  CONSTRAINT `sales_detail_table_ibfk_1` FOREIGN KEY (`sales_id`) REFERENCES `sales_table` (`sales_id`),
  CONSTRAINT `sales_detail_table_ibfk_2` FOREIGN KEY (`drug_id`) REFERENCES `drug_table` (`drug_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;






DROP TABLE IF EXISTS `sales_table`;CREATE TABLE `sales_table` (
  `sales_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `selling_date_time` datetime NOT NULL,
  `payment` bigint(20) NOT NULL,
  `back_money` bigint(20) NOT NULL,
  `price_total` int(11) NOT NULL,
  `transaction_number` char(14) NOT NULL COMMENT 'yyyymmddhhmmss',
  PRIMARY KEY (`sales_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `sales_table_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;






DROP TABLE IF EXISTS `stock_table`;CREATE TABLE `stock_table` (
  `stock_id` int(11) NOT NULL AUTO_INCREMENT,
  `drug_id` int(11) NOT NULL,
  `stock_date` date DEFAULT NULL,
  `stock` int(11) NOT NULL,
  PRIMARY KEY (`stock_id`),
  KEY `drug_id` (`drug_id`),
  CONSTRAINT `stock_table_ibfk_1` FOREIGN KEY (`drug_id`) REFERENCES `drug_table` (`drug_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;


INSERT INTO stock_table VALUES
('4','4','2021-01-23','5'),
('5','5','2021-01-23','10');




DROP TABLE IF EXISTS `stock_view`;CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `stock_view` AS select `stock_table`.`stock_id` AS `stock_id`,`stock_table`.`stock_date` AS `stock_date`,`stock_table`.`stock` AS `stock`,`drug_table`.`drug_id` AS `drug_id`,`drug_table`.`supplier_name` AS `supplier_name`,`drug_table`.`drug_name` AS `drug_name`,`drug_table`.`purchase_price` AS `purchase_price`,`drug_table`.`selling_price` AS `selling_price`,`drug_table`.`available` AS `available` from (`stock_table` join `drug_table` on(`stock_table`.`drug_id` = `drug_table`.`drug_id`)) where `drug_table`.`available` = 1 order by `drug_table`.`drug_name`;


INSERT INTO stock_view VALUES
('4','2021-01-23','5','4','KASIA','BODREX','500','1000','1'),
('5','2021-01-23','10','5','FARMA','PROMAG','6000','8000','1');




DROP TABLE IF EXISTS `user_table`;CREATE TABLE `user_table` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL,
  `status` enum('SELLER','APOTEKER','ADMIN') NOT NULL,
  `available` tinyint(4) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;


INSERT INTO user_table VALUES
('1','seller1','seller1','SELLER','1');


