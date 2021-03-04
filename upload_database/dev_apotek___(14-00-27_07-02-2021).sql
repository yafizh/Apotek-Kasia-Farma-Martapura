

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;






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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;






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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;






DROP TABLE IF EXISTS `drug_table`;CREATE TABLE `drug_table` (
  `drug_id` int(11) NOT NULL AUTO_INCREMENT,
  `supplier_name` varchar(100) NOT NULL,
  `drug_name` varchar(100) NOT NULL,
  `purchase_price` int(11) NOT NULL,
  `selling_price` int(11) NOT NULL,
  `available` tinyint(4) NOT NULL,
  PRIMARY KEY (`drug_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;


INSERT INTO drug_table VALUES
('1','KASIA FARMA','ABBOCATH 18','5000','6000','1'),
('2','KASIA FARMA','BECOM-C','7000','8000','1'),
('3','KASIA FARMA','CANDISTIN DROP','2000','4000','1'),
('4','KASIA FARMA','DAMABEN SYR','10000','12000','1'),
('5','KASIA FARMA','ELKANA SYR 60ML','12000','13000','1'),
('6','KASIA FARMA','GELIGA BALSAM 20GR','20000','22000','1'),
('7','KASIA FARMA','HANSAPLAST JUMBO','7500','8000','1'),
('8','KASIA FARMA','HILO VANILA 200 GR','9000','15000','1'),
('9','KASIA FARMA','GRAHABION TAB','11000','13000','1'),
('10','KASIA FARMA','FRISIAN UHT190 COBLS','14000','15000','1'),
('11','KASIA FARMA','ETTAWA SUSU KAMBING','16000','17000','1');




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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;






DROP TABLE IF EXISTS `mutation_in_table`;CREATE TABLE `mutation_in_table` (
  `mutation_in_id` int(11) NOT NULL AUTO_INCREMENT,
  `mutation_id` int(11) NOT NULL,
  `mutation_date_time` datetime NOT NULL,
  `mutation_in` int(11) NOT NULL,
  PRIMARY KEY (`mutation_in_id`),
  KEY `mutation_id` (`mutation_id`),
  CONSTRAINT `mutation_in_table_ibfk_1` FOREIGN KEY (`mutation_id`) REFERENCES `mutation_table` (`mutation_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;






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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;






DROP TABLE IF EXISTS `mutation_view`;CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `mutation_view` AS select `mutation_table`.`mutation_id` AS `mutation_id`,`mutation_table`.`mutation_date` AS `mutation_date`,coalesce(sum(distinct `mutation_in_table`.`mutation_in`),0) AS `stock_in`,coalesce(sum(distinct `mutation_out_table`.`mutation_out`),0) AS `stock_out`,`drug_table`.`drug_id` AS `drug_id`,`drug_table`.`drug_name` AS `drug_name` from (((`mutation_table` left join `mutation_in_table` on(`mutation_in_table`.`mutation_id` = `mutation_table`.`mutation_id`)) left join `mutation_out_table` on(`mutation_out_table`.`mutation_id` = `mutation_table`.`mutation_id`)) join `drug_table` on(`drug_table`.`drug_id` = `mutation_table`.`drug_id`)) group by `mutation_table`.`mutation_id`;






DROP TABLE IF EXISTS `sales_detail_table`;CREATE TABLE `sales_detail_table` (
  `sales_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `sales_id` int(11) NOT NULL,
  `drug_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` bigint(20) NOT NULL,
  `total_price` bigint(20) NOT NULL,
  PRIMARY KEY (`sales_detail_id`),
  KEY `sales_id` (`sales_id`),
  KEY `drug_id` (`drug_id`),
  CONSTRAINT `sales_detail_table_ibfk_1` FOREIGN KEY (`sales_id`) REFERENCES `sales_table` (`sales_id`) ON DELETE CASCADE,
  CONSTRAINT `sales_detail_table_ibfk_2` FOREIGN KEY (`drug_id`) REFERENCES `drug_table` (`drug_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;






DROP TABLE IF EXISTS `sales_detail_view`;CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `sales_detail_view` AS select `sales_detail_table`.`sales_detail_id` AS `sales_detail_id`,`sales_detail_table`.`quantity` AS `quantity`,`sales_detail_table`.`price` AS `price`,`sales_detail_table`.`total_price` AS `total_price`,`sales_table`.`sales_id` AS `sales_id`,`drug_table`.`drug_id` AS `drug_id`,`drug_table`.`supplier_name` AS `supplier_name`,`drug_table`.`drug_name` AS `drug_name`,`drug_table`.`purchase_price` AS `purchase_price`,`drug_table`.`selling_price` AS `selling_price`,`drug_table`.`available` AS `available` from ((`sales_detail_table` join `sales_table` on(`sales_detail_table`.`sales_id` = `sales_table`.`sales_id`)) join `drug_table` on(`sales_detail_table`.`drug_id` = `drug_table`.`drug_id`)) order by `sales_detail_table`.`sales_detail_id`;






DROP TABLE IF EXISTS `sales_table`;CREATE TABLE `sales_table` (
  `sales_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `sales_date_time` datetime NOT NULL,
  `payment` bigint(20) NOT NULL,
  `back_money` bigint(20) NOT NULL,
  `total_price` int(11) NOT NULL,
  `transaction_number` char(14) NOT NULL COMMENT 'yyyymmddhhmmss',
  PRIMARY KEY (`sales_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `sales_table_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;






DROP TABLE IF EXISTS `sales_view`;CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `sales_view` AS select `sales_table`.`sales_id` AS `sales_id`,cast(`sales_table`.`sales_date_time` as date) AS `date`,dayofmonth(`sales_table`.`sales_date_time`) AS `day`,month(`sales_table`.`sales_date_time`) AS `month`,year(`sales_table`.`sales_date_time`) AS `year`,cast(`sales_table`.`sales_date_time` as time) AS `time`,second(`sales_table`.`sales_date_time`) AS `second`,minute(`sales_table`.`sales_date_time`) AS `minute`,hour(`sales_table`.`sales_date_time`) AS `hour`,`sales_table`.`payment` AS `payment`,`sales_table`.`back_money` AS `back_money`,`sales_table`.`total_price` AS `total_price`,`sales_table`.`transaction_number` AS `transaction_number`,`user_table`.`user_id` AS `user_id`,`user_table`.`username` AS `username`,`user_table`.`status` AS `status` from (`sales_table` join `user_table` on(`sales_table`.`user_id` = `user_table`.`user_id`)) order by `sales_table`.`sales_id` desc;






DROP TABLE IF EXISTS `stock_table`;CREATE TABLE `stock_table` (
  `stock_id` int(11) NOT NULL AUTO_INCREMENT,
  `drug_id` int(11) NOT NULL,
  `stock_date` date DEFAULT NULL,
  `stock` int(11) NOT NULL,
  PRIMARY KEY (`stock_id`),
  KEY `drug_id` (`drug_id`),
  CONSTRAINT `stock_table_ibfk_1` FOREIGN KEY (`drug_id`) REFERENCES `drug_table` (`drug_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;


INSERT INTO stock_table VALUES
('1','1','2021-02-07','100'),
('2','2','2021-02-07','100'),
('3','3','2021-02-07','100'),
('4','4','2021-02-07','100'),
('5','5','2021-02-07','100'),
('6','6','2021-02-07','100'),
('7','7','2021-02-07','100'),
('8','8','2021-02-07','100'),
('9','9','2021-02-07','100'),
('10','10','2021-02-07','100'),
('11','11','2021-02-07','100');




DROP TABLE IF EXISTS `stock_view`;CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `stock_view` AS select `stock_table`.`stock_id` AS `stock_id`,`stock_table`.`stock_date` AS `stock_date`,`stock_table`.`stock` AS `stock`,`drug_table`.`drug_id` AS `drug_id`,`drug_table`.`supplier_name` AS `supplier_name`,`drug_table`.`drug_name` AS `drug_name`,`drug_table`.`purchase_price` AS `purchase_price`,`drug_table`.`selling_price` AS `selling_price`,`drug_table`.`available` AS `available` from (`stock_table` join `drug_table` on(`stock_table`.`drug_id` = `drug_table`.`drug_id`)) where `drug_table`.`available` = 1 order by `drug_table`.`drug_name`;


INSERT INTO stock_view VALUES
('1','2021-02-07','100','1','KASIA FARMA','ABBOCATH 18','5000','6000','1'),
('2','2021-02-07','100','2','KASIA FARMA','BECOM-C','7000','8000','1'),
('3','2021-02-07','100','3','KASIA FARMA','CANDISTIN DROP','2000','4000','1'),
('4','2021-02-07','100','4','KASIA FARMA','DAMABEN SYR','10000','12000','1'),
('5','2021-02-07','100','5','KASIA FARMA','ELKANA SYR 60ML','12000','13000','1'),
('11','2021-02-07','100','11','KASIA FARMA','ETTAWA SUSU KAMBING','16000','17000','1'),
('10','2021-02-07','100','10','KASIA FARMA','FRISIAN UHT190 COBLS','14000','15000','1'),
('6','2021-02-07','100','6','KASIA FARMA','GELIGA BALSAM 20GR','20000','22000','1'),
('9','2021-02-07','100','9','KASIA FARMA','GRAHABION TAB','11000','13000','1'),
('7','2021-02-07','100','7','KASIA FARMA','HANSAPLAST JUMBO','7500','8000','1'),
('8','2021-02-07','100','8','KASIA FARMA','HILO VANILA 200 GR','9000','15000','1');




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


