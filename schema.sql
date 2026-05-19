CREATE DATABASE IF NOT EXISTS `ais-integrated-systems`;
USE `ais-integrated-systems`;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `pass` VARCHAR(255) NOT NULL,
  `firstName` VARCHAR(100) NOT NULL,
  `lastName` VARCHAR(100) NOT NULL,
  `dob` DATE NULL,
  `course` VARCHAR(100) NULL,
  `major` VARCHAR(150) NULL,
  `address` VARCHAR(255) NULL,
  `status` VARCHAR(50) NULL,
  `legacyStudentId` VARCHAR(100) NULL,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_legacy_student_id` (`legacyStudentId`)
);
