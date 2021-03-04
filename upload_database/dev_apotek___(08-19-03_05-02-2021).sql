

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;


INSERT INTO drug_adding_table VALUES
('1','1','1','KASIA','BODREX','200','400','4','2021-02-02 05:27:30'),
('2','1','2','KASIA','PROMAG','500','1000','5','2021-02-02 05:57:06'),
('3','1','3','KASIA FARMA','BODREX DAN PROMAG','200','200','4','2021-02-02 11:23:57');




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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;


INSERT INTO drug_table VALUES
('1','KASIA','BODREX','200','400','1'),
('2','KASIA','PROMAG','500','1000','1'),
('3','KASIA FARMA','BODREX DAN PROMAG','200','200','1');




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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;


INSERT INTO mutation_in_table VALUES
('1','1','2021-02-02 05:27:30','4'),
('2','2','2021-02-02 05:57:06','5'),
('3','3','2021-02-02 11:23:57','4');




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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;


INSERT INTO mutation_table VALUES
('1','1','2021-02-02'),
('2','2','2021-02-02'),
('3','3','2021-02-02');




DROP TABLE IF EXISTS `mutation_view`;CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `mutation_view` AS select `mutation_table`.`mutation_id` AS `mutation_id`,`mutation_table`.`mutation_date` AS `mutation_date`,coalesce(sum(distinct `mutation_in_table`.`mutation_in`),0) AS `stock_in`,coalesce(sum(distinct `mutation_out_table`.`mutation_out`),0) AS `stock_out`,`drug_table`.`drug_id` AS `drug_id`,`drug_table`.`drug_name` AS `drug_name` from (((`mutation_table` left join `mutation_in_table` on(`mutation_in_table`.`mutation_id` = `mutation_table`.`mutation_id`)) left join `mutation_out_table` on(`mutation_out_table`.`mutation_id` = `mutation_table`.`mutation_id`)) join `drug_table` on(`drug_table`.`drug_id` = `mutation_table`.`drug_id`)) group by `mutation_table`.`mutation_id`;


INSERT INTO mutation_view VALUES
('1','2021-02-02','4','0','1','BODREX'),
('2','2021-02-02','5','0','2','PROMAG'),
('3','2021-02-02','4','0','3','BODREX DAN PROMAG');




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
  CONSTRAINT `sales_detail_table_ibfk_1` FOREIGN KEY (`sales_id`) REFERENCES `sales_table` (`sales_id`),
  CONSTRAINT `sales_detail_table_ibfk_2` FOREIGN KEY (`drug_id`) REFERENCES `drug_table` (`drug_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;


INSERT INTO sales_detail_table VALUES
('1','1','1','3','400','1200'),
('2','2','1','1','400','400'),
('3','3','1','1','400','400'),
('4','3','2','1','1000','1000'),
('5','4','1','1','400','400'),
('7','5','1','1','400','400'),
('8','5','2','1','1000','1000'),
('9','6','1','1','400','400'),
('10','6','2','1','1000','1000');




DROP TABLE IF EXISTS `sales_detail_view`;CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `sales_detail_view` AS select `sales_detail_table`.`sales_detail_id` AS `sales_detail_id`,`sales_detail_table`.`quantity` AS `quantity`,`sales_detail_table`.`price` AS `price`,`sales_detail_table`.`total_price` AS `total_price`,`sales_table`.`sales_id` AS `sales_id`,`drug_table`.`drug_id` AS `drug_id`,`drug_table`.`supplier_name` AS `supplier_name`,`drug_table`.`drug_name` AS `drug_name`,`drug_table`.`purchase_price` AS `purchase_price`,`drug_table`.`selling_price` AS `selling_price`,`drug_table`.`available` AS `available` from ((`sales_detail_table` join `sales_table` on(`sales_detail_table`.`sales_id` = `sales_table`.`sales_id`)) join `drug_table` on(`sales_detail_table`.`drug_id` = `drug_table`.`drug_id`)) order by `sales_detail_table`.`sales_detail_id`;


INSERT INTO sales_detail_view VALUES
('1','3','400','1200','1','1','KASIA','BODREX','200','400','1'),
('2','1','400','400','2','1','KASIA','BODREX','200','400','1'),
('3','1','400','400','3','1','KASIA','BODREX','200','400','1'),
('4','1','1000','1000','3','2','KASIA','PROMAG','500','1000','1'),
('5','1','400','400','4','1','KASIA','BODREX','200','400','1'),
('7','1','400','400','5','1','KASIA','BODREX','200','400','1'),
('8','1','1000','1000','5','2','KASIA','PROMAG','500','1000','1'),
('9','1','400','400','6','1','KASIA','BODREX','200','400','1'),
('10','1','1000','1000','6','2','KASIA','PROMAG','500','1000','1');




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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;


INSERT INTO sales_table VALUES
('1','1','2021-02-02 05:28:38','2000','800','0','20210202052838'),
('2','1','2021-02-02 06:23:52','2000','1600','400','20210202062352'),
('3','1','2021-02-02 06:33:56','2000','600','1400','20210202063356'),
('4','1','2021-02-02 06:34:42','2000','600','1400','20210202063442'),
('5','1','2021-02-02 06:38:23','2000','600','1400','20210202063823'),
('6','1','2021-02-02 06:40:00','2000','600','1400','20210202064000');




DROP TABLE IF EXISTS `sales_view`;CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `sales_view` AS select `sales_table`.`sales_id` AS `sales_id`,cast(`sales_table`.`sales_date_time` as date) AS `date`,dayofmonth(`sales_table`.`sales_date_time`) AS `day`,month(`sales_table`.`sales_date_time`) AS `month`,year(`sales_table`.`sales_date_time`) AS `year`,cast(`sales_table`.`sales_date_time` as time) AS `time`,second(`sales_table`.`sales_date_time`) AS `second`,minute(`sales_table`.`sales_date_time`) AS `minute`,hour(`sales_table`.`sales_date_time`) AS `hour`,`sales_table`.`payment` AS `payment`,`sales_table`.`back_money` AS `back_money`,`sales_table`.`total_price` AS `total_price`,`sales_table`.`transaction_number` AS `transaction_number`,`user_table`.`user_id` AS `user_id`,`user_table`.`username` AS `username`,`user_table`.`status` AS `status` from (`sales_table` join `user_table` on(`sales_table`.`user_id` = `user_table`.`user_id`)) order by `sales_table`.`sales_id` desc;


INSERT INTO sales_view VALUES
('6','2021-02-02','2','2','2021','06:40:00','0','40','6','2000','600','1400','20210202064000','1','seller1','SELLER'),
('5','2021-02-02','2','2','2021','06:38:23','23','38','6','2000','600','1400','20210202063823','1','seller1','SELLER'),
('4','2021-02-02','2','2','2021','06:34:42','42','34','6','2000','600','1400','20210202063442','1','seller1','SELLER'),
('3','2021-02-02','2','2','2021','06:33:56','56','33','6','2000','600','1400','20210202063356','1','seller1','SELLER'),
('2','2021-02-02','2','2','2021','06:23:52','52','23','6','2000','1600','400','20210202062352','1','seller1','SELLER'),
('1','2021-02-02','2','2','2021','05:28:38','38','28','5','2000','800','0','20210202052838','1','seller1','SELLER');




DROP TABLE IF EXISTS `stock_table`;CREATE TABLE `stock_table` (
  `stock_id` int(11) NOT NULL AUTO_INCREMENT,
  `drug_id` int(11) NOT NULL,
  `stock_date` date DEFAULT NULL,
  `stock` int(11) NOT NULL,
  PRIMARY KEY (`stock_id`),
  KEY `drug_id` (`drug_id`),
  CONSTRAINT `stock_table_ibfk_1` FOREIGN KEY (`drug_id`) REFERENCES `drug_table` (`drug_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;


INSERT INTO stock_table VALUES
('1','1','2021-02-02','0'),
('2','2','2021-02-02','3'),
('3','3','2021-02-02','4');




DROP TABLE IF EXISTS `stock_view`;CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `stock_view` AS select `stock_table`.`stock_id` AS `stock_id`,`stock_table`.`stock_date` AS `stock_date`,`stock_table`.`stock` AS `stock`,`drug_table`.`drug_id` AS `drug_id`,`drug_table`.`supplier_name` AS `supplier_name`,`drug_table`.`drug_name` AS `drug_name`,`drug_table`.`purchase_price` AS `purchase_price`,`drug_table`.`selling_price` AS `selling_price`,`drug_table`.`available` AS `available` from (`stock_table` join `drug_table` on(`stock_table`.`drug_id` = `drug_table`.`drug_id`)) where `drug_table`.`available` = 1 order by `drug_table`.`drug_name`;


INSERT INTO stock_view VALUES
('1','2021-02-02','0','1','KASIA','BODREX','200','400','1'),
('3','2021-02-02','4','3','KASIA FARMA','BODREX DAN PROMAG','200','200','1'),
('2','2021-02-02','3','2','KASIA','PROMAG','500','1000','1');




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


