CREATE DATABASE IF NOT EXISTS `ais-integrated-systems`;
USE `ais-integrated-systems`;

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `birthdate` date DEFAULT NULL,
  `address` text DEFAULT NULL,
  `program` varchar(100) DEFAULT NULL,
  `studentStatus` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
