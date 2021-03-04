

DROP TABLE IF EXISTS `t_drugs`;CREATE TABLE `t_drugs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `drug_name` varchar(100) DEFAULT NULL,
  `purchase_price` int(11) DEFAULT NULL,
  `selling_price` int(11) DEFAULT NULL,
  `available` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;


INSERT INTO t_drugs VALUES
('3','ABBOCATH 20','15000','16000','0'),
('4','ABBOCATH 22','20000','22000','0'),
('5','ABSOLUTE','14000','15000','0'),
('6','ACETON 60ML','6000','7000','1'),
('7','ACIFAR CR 5 GR','6000','8000','1'),
('8','ACITRAL TAB','1000','3000','1'),
('9','ACLONAC GEL','33000','35000','0'),
('10','ACNOL 10ML','10000','12000','1'),
('11','ACTIFED H 60ML','30000','35000','1'),
('12','ACTIFED K 60ML','26000','30000','1'),
('13','ACTIFED M 60ML','29000','30000','1'),
('14','FITIKOM GUMMY','15000','16000','1'),
('15','FITIKOM GUMMY','15000','16000','1'),
('16','FRESH CARE ORIGINAL','10000','12000','1'),
('19','FRESH CARE SPLASH FRUIT','10000','20000','1'),
('20','FUMADRYL 60 ML','6000','7000','1'),
('21','FUROSEMID 40MG','500','1000','1'),
('22','FUSON CR 5GR','47000','50000','1'),
('23','GABITEN TAB','500','1000','1');




DROP TABLE IF EXISTS `t_mutation`;CREATE TABLE `t_mutation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `drug_id` int(11) DEFAULT NULL,
  `mutation_date` date DEFAULT NULL,
  `stock_in` smallint(6) DEFAULT NULL,
  `stock_out` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=219 DEFAULT CHARSET=utf8mb4;


INSERT INTO t_mutation VALUES
('3','3','2020-10-28','5','2'),
('4','4','2020-10-28','10','1'),
('5','3','2020-10-29','0','0'),
('6','4','2020-10-29','0','0'),
('7','5','2020-10-29','9','0'),
('8','6','2020-10-29','12','0'),
('9','7','2020-10-29','7','0'),
('10','8','2020-10-29','5','0'),
('11','9','2020-10-29','2','0'),
('12','10','2020-10-29','30','0'),
('13','11','2020-10-29','7','0'),
('14','12','2020-10-29','5','0'),
('15','13','2020-10-29','2','0'),
('16','14','2020-10-29','20','0'),
('17','15','2020-10-29','20','0'),
('18','3','2020-10-30','0','0'),
('19','4','2020-10-30','0','0'),
('20','5','2020-10-30','0','0'),
('21','6','2020-10-30','0','0'),
('22','7','2020-10-30','0','0'),
('23','8','2020-10-30','0','0'),
('24','9','2020-10-30','0','0'),
('25','10','2020-10-30','0','0'),
('26','11','2020-10-30','0','0'),
('27','12','2020-10-30','0','0'),
('28','13','2020-10-30','0','0'),
('29','14','2020-10-30','0','0'),
('30','15','2020-10-30','0','0'),
('69','3','2020-10-31','0','0'),
('70','4','2020-10-31','0','3'),
('71','5','2020-10-31','0','0'),
('72','6','2020-10-31','0','0'),
('73','7','2020-10-31','0','0'),
('74','8','2020-10-31','0','0'),
('75','9','2020-10-31','0','0'),
('76','10','2020-10-31','0','0'),
('77','11','2020-10-31','0','0'),
('78','12','2020-10-31','0','0'),
('79','13','2020-10-31','0','0'),
('80','14','2020-10-31','0','0'),
('81','15','2020-10-31','0','0'),
('82','16','2020-10-31','5','0'),
('83','19','2020-10-31','3','0'),
('84','3','2020-11-01','0','0'),
('85','4','2020-11-01','0','0'),
('86','5','2020-11-01','0','0'),
('87','6','2020-11-01','0','0'),
('88','7','2020-11-01','0','0'),
('89','8','2020-11-01','0','0'),
('90','9','2020-11-01','0','0'),
('91','10','2020-11-01','0','0'),
('92','11','2020-11-01','0','0'),
('93','12','2020-11-01','0','0'),
('94','13','2020-11-01','0','0'),
('95','14','2020-11-01','0','0'),
('96','15','2020-11-01','0','0'),
('97','16','2020-11-01','0','0'),
('98','19','2020-11-01','0','0'),
('99','4','2020-11-02','1','0'),
('100','5','2020-11-02','0','0'),
('101','6','2020-11-02','0','0'),
('102','7','2020-11-02','0','0'),
('103','8','2020-11-02','0','4'),
('104','9','2020-11-02','0','1'),
('105','10','2020-11-02','0','0'),
('106','11','2020-11-02','0','0'),
('107','12','2020-11-02','0','0'),
('108','13','2020-11-02','0','0'),
('109','14','2020-11-02','0','0'),
('110','15','2020-11-02','0','0'),
('111','16','2020-11-02','0','0'),
('112','19','2020-11-02','0','0'),
('113','4','2020-11-04','0','3'),
('114','5','2020-11-04','0','1'),
('115','6','2020-11-04','0','3'),
('116','7','2020-11-04','0','0'),
('117','8','2020-11-04','0','0'),
('118','9','2020-11-04','0','1'),
('119','10','2020-11-04','0','2'),
('120','11','2020-11-04','0','0'),
('121','12','2020-11-04','0','3'),
('122','13','2020-11-04','0','1'),
('123','14','2020-11-04','0','0'),
('124','15','2020-11-04','0','0'),
('125','16','2020-11-04','0','0'),
('126','19','2020-11-04','0','0'),
('127','4','2020-11-06','0','0'),
('128','5','2020-11-06','0','0'),
('129','6','2020-11-06','0','0'),
('130','7','2020-11-06','0','0'),
('131','8','2020-11-06','0','0'),
('132','9','2020-11-06','0','0'),
('133','10','2020-11-06','0','0'),
('134','11','2020-11-06','0','0'),
('135','12','2020-11-06','0','0'),
('136','13','2020-11-06','0','0'),
('137','14','2020-11-06','0','0'),
('138','15','2020-11-06','0','0'),
('139','16','2020-11-06','0','0'),
('140','19','2020-11-06','0','0');
INSERT INTO t_mutation VALUES
('141','4','2020-11-07','0','0'),
('142','5','2020-11-07','0','0'),
('143','6','2020-11-07','2','2'),
('144','7','2020-11-07','0','0'),
('145','8','2020-11-07','0','0'),
('146','9','2020-11-07','0','0'),
('147','10','2020-11-07','0','2'),
('148','11','2020-11-07','0','3'),
('149','12','2020-11-07','0','2'),
('150','13','2020-11-07','0','1'),
('151','14','2020-11-07','0','0'),
('152','15','2020-11-07','0','3'),
('153','16','2020-11-07','0','0'),
('154','19','2020-11-07','0','0'),
('155','20','2020-11-07','5','0'),
('156','21','2020-11-07','10','0'),
('157','22','2020-11-07','30','0'),
('158','6','2020-11-14','0','0'),
('159','7','2020-11-14','0','0'),
('160','8','2020-11-14','0','0'),
('161','9','2020-11-14','0','0'),
('162','10','2020-11-14','0','0'),
('163','11','2020-11-14','0','0'),
('164','12','2020-11-14','0','0'),
('165','13','2020-11-14','0','0'),
('166','14','2020-11-14','0','0'),
('167','15','2020-11-14','0','0'),
('168','16','2020-11-14','0','0'),
('169','19','2020-11-14','0','0'),
('170','20','2020-11-14','0','0'),
('171','21','2020-11-14','0','0'),
('172','22','2020-11-14','0','0'),
('173','6','2020-11-15','0','0'),
('174','7','2020-11-15','0','0'),
('175','8','2020-11-15','0','0'),
('176','9','2020-11-15','0','0'),
('177','10','2020-11-15','0','0'),
('178','11','2020-11-15','0','0'),
('179','12','2020-11-15','0','0'),
('180','13','2020-11-15','0','0'),
('181','14','2020-11-15','0','0'),
('182','15','2020-11-15','0','0'),
('183','16','2020-11-15','0','0'),
('184','19','2020-11-15','0','0'),
('185','20','2020-11-15','0','0'),
('186','21','2020-11-15','0','0'),
('187','22','2020-11-15','0','0'),
('188','6','2020-11-23','1','0'),
('189','7','2020-11-23','0','0'),
('190','8','2020-11-23','0','0'),
('191','9','2020-11-23','0','0'),
('192','10','2020-11-23','0','0'),
('193','11','2020-11-23','0','0'),
('194','12','2020-11-23','0','0'),
('195','13','2020-11-23','0','0'),
('196','14','2020-11-23','0','0'),
('197','15','2020-11-23','0','0'),
('198','16','2020-11-23','0','0'),
('199','19','2020-11-23','0','0'),
('200','20','2020-11-23','0','0'),
('201','21','2020-11-23','0','0'),
('202','22','2020-11-23','0','0'),
('203','23','2020-11-23','0','0'),
('204','6','2020-11-24','0','2'),
('205','7','2020-11-24','0','4'),
('206','8','2020-11-24','0','0'),
('207','10','2020-11-24','0','0'),
('208','11','2020-11-24','0','0'),
('209','12','2020-11-24','0','0'),
('210','13','2020-11-24','0','0'),
('211','14','2020-11-24','0','0'),
('212','15','2020-11-24','0','0'),
('213','16','2020-11-24','0','3'),
('214','19','2020-11-24','0','0'),
('215','20','2020-11-24','0','0'),
('216','21','2020-11-24','0','0'),
('217','22','2020-11-24','0','1'),
('218','23','2020-11-24','0','0');




DROP TABLE IF EXISTS `t_selling`;CREATE TABLE `t_selling` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `drug_id` int(11) DEFAULT NULL,
  `quantity` smallint(6) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `total_price` int(11) DEFAULT NULL,
  `selling_time` time DEFAULT NULL,
  `selling_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4;


INSERT INTO t_selling VALUES
('7','1','3','2','16000','32000','16:44:32','2020-10-28'),
('8','1','4','1','16000','16000','16:44:32','2020-10-28'),
('9','1','4','3','16000','48000','16:25:38','2020-10-31'),
('10','1','8','2','3000','6000','20:23:20','2020-11-02'),
('11','1','9','1','35000','35000','20:23:20','2020-11-02'),
('12','1','8','2','3000','6000','20:25:08','2020-11-02'),
('13','1','5','1','15000','15000','02:34:14','2020-11-04'),
('14','1','12','3','30000','90000','02:34:14','2020-11-04'),
('15','1','4','3','22000','66000','02:50:28','2020-11-04'),
('16','1','6','3','7000','21000','03:27:01','2020-11-04'),
('17','1','13','1','30000','30000','03:27:45','2020-11-04'),
('18','1','10','2','12000','24000','03:28:26','2020-11-04'),
('19','1','9','1','35000','35000','03:28:43','2020-11-04'),
('20','1','10','1','12000','12000','19:25:18','2020-11-07'),
('21','1','10','1','12000','12000','19:25:18','2020-11-07'),
('22','1','12','2','30000','60000','19:26:33','2020-11-07'),
('23','1','13','1','30000','30000','19:26:33','2020-11-07'),
('24','1','11','1','35000','35000','19:26:54','2020-11-07'),
('25','1','11','1','35000','35000','19:26:54','2020-11-07'),
('26','1','11','1','35000','35000','19:26:55','2020-11-07'),
('27','1','6','2','7000','14000','20:18:01','2020-11-07'),
('28','1','15','3','16000','48000','20:18:01','2020-11-07'),
('29','1','6','1','7000','7000','07:55:54','2020-11-24'),
('30','1','6','1','7000','7000','07:59:30','2020-11-24'),
('31','1','7','3','8000','24000','08:00:46','2020-11-24'),
('32','1','7','1','8000','8000','08:01:26','2020-11-24'),
('33','1','16','3','12000','36000','17:20:55','2020-11-24'),
('34','1','22','1','50000','50000','20:37:07','2020-11-24');




DROP TABLE IF EXISTS `t_stock`;CREATE TABLE `t_stock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `drug_id` int(11) DEFAULT NULL,
  `stock` smallint(6) DEFAULT NULL,
  `stock_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=264 DEFAULT CHARSET=utf8mb4;


INSERT INTO t_stock VALUES
('3','3','3','2020-10-28'),
('4','4','20','2020-10-28'),
('5','3','3','2020-10-29'),
('6','4','20','2020-10-29'),
('7','5','9','2020-10-29'),
('8','6','12','2020-10-29'),
('9','7','7','2020-10-29'),
('10','8','5','2020-10-29'),
('11','9','2','2020-10-29'),
('12','10','30','2020-10-29'),
('13','11','7','2020-10-29'),
('14','12','5','2020-10-29'),
('15','13','2','2020-10-29'),
('16','14','20','2020-10-29'),
('17','15','20','2020-10-29'),
('18','3','3','2020-10-30'),
('19','4','20','2020-10-30'),
('20','5','9','2020-10-30'),
('21','6','12','2020-10-30'),
('22','7','7','2020-10-30'),
('23','8','5','2020-10-30'),
('24','9','2','2020-10-30'),
('25','10','30','2020-10-30'),
('26','11','7','2020-10-30'),
('27','12','5','2020-10-30'),
('28','13','2','2020-10-30'),
('29','14','20','2020-10-30'),
('30','15','20','2020-10-30'),
('82','3','3','2020-10-31'),
('83','4','20','2020-10-31'),
('84','5','9','2020-10-31'),
('85','6','12','2020-10-31'),
('86','7','7','2020-10-31'),
('87','8','5','2020-10-31'),
('88','9','2','2020-10-31'),
('89','10','30','2020-10-31'),
('90','11','7','2020-10-31'),
('91','12','5','2020-10-31'),
('92','13','2','2020-10-31'),
('93','14','20','2020-10-31'),
('94','15','20','2020-10-31'),
('95','16','5','2020-10-31'),
('98','19','3','2020-10-31'),
('99','3','5','2020-11-01'),
('100','4','20','2020-11-01'),
('101','5','9','2020-11-01'),
('102','6','12','2020-11-01'),
('103','7','7','2020-11-01'),
('104','8','5','2020-11-01'),
('105','9','2','2020-11-01'),
('106','10','30','2020-11-01'),
('107','11','7','2020-11-01'),
('108','12','5','2020-11-01'),
('109','13','2','2020-11-01'),
('110','14','20','2020-11-01'),
('111','15','20','2020-11-01'),
('112','16','5','2020-11-01'),
('113','19','3','2020-11-01'),
('114','4','21','2020-11-02'),
('115','5','9','2020-11-02'),
('116','6','12','2020-11-02'),
('117','7','7','2020-11-02'),
('118','8','1','2020-11-02'),
('119','9','1','2020-11-02'),
('120','10','30','2020-11-02'),
('121','11','7','2020-11-02'),
('122','12','5','2020-11-02'),
('123','13','2','2020-11-02'),
('124','14','20','2020-11-02'),
('125','15','20','2020-11-02'),
('126','16','5','2020-11-02'),
('127','19','3','2020-11-02'),
('128','4','18','2020-11-04'),
('129','5','8','2020-11-04'),
('130','6','9','2020-11-04'),
('131','7','7','2020-11-04'),
('132','8','1','2020-11-04'),
('133','9','0','2020-11-04'),
('134','10','28','2020-11-04'),
('135','11','7','2020-11-04'),
('136','12','2','2020-11-04'),
('137','13','1','2020-11-04'),
('138','14','20','2020-11-04'),
('139','15','20','2020-11-04'),
('140','16','5','2020-11-04'),
('141','19','3','2020-11-04'),
('142','4','18','2020-11-06'),
('143','5','8','2020-11-06'),
('144','6','9','2020-11-06'),
('145','7','7','2020-11-06'),
('146','8','1','2020-11-06'),
('147','9','0','2020-11-06'),
('148','10','28','2020-11-06'),
('149','11','7','2020-11-06'),
('150','12','2','2020-11-06'),
('151','13','1','2020-11-06'),
('152','14','20','2020-11-06'),
('153','15','20','2020-11-06'),
('154','16','5','2020-11-06'),
('155','19','3','2020-11-06');
INSERT INTO t_stock VALUES
('156','4','18','2020-11-07'),
('157','5','8','2020-11-07'),
('158','6','9','2020-11-07'),
('159','7','7','2020-11-07'),
('160','8','1','2020-11-07'),
('161','9','0','2020-11-07'),
('162','10','27','2020-11-07'),
('163','11','6','2020-11-07'),
('164','12','0','2020-11-07'),
('165','13','0','2020-11-07'),
('166','14','20','2020-11-07'),
('167','15','17','2020-11-07'),
('168','16','5','2020-11-07'),
('169','19','3','2020-11-07'),
('170','20','5','2020-11-07'),
('171','21','10','2020-11-07'),
('172','22','30','2020-11-07'),
('173','6','9','2020-11-14'),
('174','7','7','2020-11-14'),
('175','8','1','2020-11-14'),
('176','9','0','2020-11-14'),
('177','10','27','2020-11-14'),
('178','11','6','2020-11-14'),
('179','12','0','2020-11-14'),
('180','13','0','2020-11-14'),
('181','14','20','2020-11-14'),
('182','15','17','2020-11-14'),
('183','16','5','2020-11-14'),
('184','19','3','2020-11-14'),
('185','20','5','2020-11-14'),
('186','21','10','2020-11-14'),
('187','22','30','2020-11-14'),
('188','6','9','2020-11-15'),
('189','7','7','2020-11-15'),
('190','8','1','2020-11-15'),
('191','9','0','2020-11-15'),
('192','10','27','2020-11-15'),
('193','11','6','2020-11-15'),
('194','12','0','2020-11-15'),
('195','13','0','2020-11-15'),
('196','14','20','2020-11-15'),
('197','15','17','2020-11-15'),
('198','16','5','2020-11-15'),
('199','19','3','2020-11-15'),
('200','20','5','2020-11-15'),
('201','21','10','2020-11-15'),
('202','22','30','2020-11-15'),
('203','6','10','2020-11-23'),
('204','7','7','2020-11-23'),
('205','8','1','2020-11-23'),
('206','9','0','2020-11-23'),
('207','10','27','2020-11-23'),
('208','11','6','2020-11-23'),
('209','12','0','2020-11-23'),
('210','13','0','2020-11-23'),
('211','14','20','2020-11-23'),
('212','15','17','2020-11-23'),
('213','16','5','2020-11-23'),
('214','19','3','2020-11-23'),
('215','20','5','2020-11-23'),
('216','21','10','2020-11-23'),
('217','22','30','2020-11-23'),
('218','23','0','2020-11-23'),
('249','6','10','2020-11-24'),
('250','7','7','2020-11-24'),
('251','8','1','2020-11-24'),
('252','10','27','2020-11-24'),
('253','11','6','2020-11-24'),
('254','12','0','2020-11-24'),
('255','13','0','2020-11-24'),
('256','14','20','2020-11-24'),
('257','15','17','2020-11-24'),
('258','16','2','2020-11-24'),
('259','19','3','2020-11-24'),
('260','20','5','2020-11-24'),
('261','21','10','2020-11-24'),
('262','22','29','2020-11-24'),
('263','23','0','2020-11-24');




DROP TABLE IF EXISTS `t_update_data`;CREATE TABLE `t_update_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `drug_id` int(11) DEFAULT NULL,
  `drug_name` varchar(100) DEFAULT NULL,
  `purchase_price` int(11) DEFAULT NULL,
  `selling_price` int(11) DEFAULT NULL,
  `stock` smallint(6) DEFAULT NULL,
  `supply` smallint(6) DEFAULT NULL,
  `update_data_time` time DEFAULT NULL,
  `update_data_date` date DEFAULT NULL,
  `comment` set('PENAMBAHAN DATA','PENGHAPUSAN DATA','PERUBAHAN NAMA','PERUBAHAN HARGA BELI','PERUBAHAN HARGA JUAL','PERUBAHAN STOK','PENYUPLAIAN STOK') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4;


INSERT INTO t_update_data VALUES
('3','1','3','','14900','16000','','','14:20:01','2020-10-31',''),
('4','1','4','','14900','16000','','','14:32:15','2020-10-31',''),
('5','1','5','','14000','15000','','','13:16:49','2020-10-31',''),
('6','1','6','','6000','7000','','','16:47:18','2020-10-31',''),
('7','1','7','','6000','8000','','','16:47:38','2020-10-31',''),
('8','1','8','','1000','3000','','','16:47:53','2020-10-31',''),
('9','1','9','','33000','35000','','','16:48:38','2020-10-31',''),
('10','1','10','','10000','12000','','','16:49:00','2020-10-31',''),
('11','1','11','','30000','35000','','','16:49:17','2020-10-31',''),
('12','1','12','','26000','30000','','','16:49:37','2020-10-31',''),
('13','1','13','','29000','30000','','','16:49:52','2020-10-31',''),
('14','1','14','','15000','16000','','','16:50:31','2020-10-31',''),
('15','1','15','','15000','16000','','','16:50:31','2020-10-31',''),
('16','1','16','FRESH CARE ORIGINAL','10000','12000','5','','15:17:17','2020-10-31',''),
('19','1','19','FRESH CARE SPLASH FRUIT','10000','20000','3','','15:21:22','2020-10-31',''),
('32','1','4','ABBOCATH 18','14900','16000','5','','19:45:00','2020-11-01','PERUBAHAN STOK'),
('33','1','4','ABBOCATH 22','20000','22000','20','','19:45:44','2020-11-01','PERUBAHAN NAMA,PERUBAHAN HARGA BELI,PERUBAHAN HARGA JUAL,PERUBAHAN STOK'),
('34','1','3','ABBOCATH 20','14900','16000','4','','19:46:57','2020-11-01','PERUBAHAN STOK'),
('35','1','3','ABBOCATH 20','14900','16000','5','','19:47:47','2020-11-01','PERUBAHAN STOK'),
('36','1','3','ABBOCATH 20','15000','16000','5','','19:47:57','2020-11-01','PERUBAHAN HARGA BELI'),
('37','1','3','ABBOCATH 20','15000','16000','5','','20:13:06','2020-11-01','PENGHAPUSAN DATA'),
('45','1','4','ABBOCATH 22','20000','22000','20','1','13:09:01','2020-11-02','PENYUPLAIAN STOK'),
('46','1','20','FUMADRYL 60 ML','6000','7000','0','5','15:56:23','2020-11-07','PENAMBAHAN DATA'),
('47','1','21','FUROSEMID 40MG','500','1000','0','10','15:58:30','2020-11-07','PENAMBAHAN DATA'),
('48','1','4','ABBOCATH 22','20000','23000','18','','20:08:10','2020-11-07','PERUBAHAN HARGA JUAL'),
('49','1','4','ABBOCATH 22','20000','22000','18','0','20:09:23','2020-11-07','PERUBAHAN HARGA JUAL'),
('50','1','4','ABBOCATH 22','20000','22000','18','','20:09:44','2020-11-07','PENGHAPUSAN DATA'),
('51','1','5','ABSOLUTE','14000','15000','8','0','20:10:19','2020-11-07','PENGHAPUSAN DATA'),
('52','1','22','FUSON CR 5GR','47000','50000','0','30','20:12:28','2020-11-07','PENAMBAHAN DATA'),
('53','1','6','ACETON 60ML','6000','7000','9','2','20:13:36','2020-11-07','PENYUPLAIAN STOK'),
('54','1','23','GABITEN TAB','500','1000','0','0','06:11:30','2020-11-23','PENAMBAHAN DATA'),
('55','1','9','ACLONAC GEL','33000','35000','0','0','06:32:57','2020-11-23','PENGHAPUSAN DATA'),
('56','1','6','ACETON 60ML','6000','7000','9','1','06:53:14','2020-11-23','PENYUPLAIAN STOK');




DROP TABLE IF EXISTS `t_users`;CREATE TABLE `t_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL,
  `status` enum('SELLER','APOTEKER','ADMIN') DEFAULT NULL,
  `available` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;


INSERT INTO t_users VALUES
('1','seller1','seller1','SELLER','1'),
('2','apoteker1','apoteker1','APOTEKER','1'),
('3','admin','admin','ADMIN','1');


