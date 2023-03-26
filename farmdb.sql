-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 26, 2023 at 10:16 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `farmdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `crops`
--

CREATE TABLE `crops` (
  `crop` varchar(15) NOT NULL,
  `minPH` float NOT NULL,
  `maxPH` float NOT NULL,
  `minTemperature` float NOT NULL,
  `maxTemperature` float NOT NULL,
  `minHumidity` int(11) NOT NULL,
  `maxHumidity` int(11) NOT NULL,
  `minLight` int(11) NOT NULL,
  `maxLight` int(11) NOT NULL,
  `cost` int(11) NOT NULL,
  `yield` int(11) NOT NULL,
  `time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `crops`
--

INSERT INTO `crops` (`crop`, `minPH`, `maxPH`, `minTemperature`, `maxTemperature`, `minHumidity`, `maxHumidity`, `minLight`, `maxLight`, `cost`, `yield`, `time`) VALUES
('Barley', 6.5, 7, 14, 20, 30, 60, 20, 50, 150, 500, 60),
('Corn', 5.5, 7, 26, 30, 50, 80, 35, 85, 75, 400, 90),
('Field Beans', 6.7, 9.7, 20, 32, 15, 80, 15, 70, 100, 445, 40),
('Fruits', 4.8, 7.8, 15, 30, 30, 70, 20, 65, 60, 300, 55),
('Millet', 2.3, 7.3, 13, 28, 45, 85, 35, 95, 85, 370, 35),
('Oats', 6.2, 6.6, 15, 25, 25, 75, 10, 40, 80, 300, 30),
('Oilseed', 5, 7.8, 20, 26, 28, 68, 30, 100, 85, 320, 25),
('Peas', 3.6, 5, 15, 20, 15, 60, 25, 60, 110, 370, 35),
('Potatoes', 3.6, 6.6, 9, 29, 28, 68, 20, 80, 80, 360, 42),
('Rice', 6, 6.7, 20, 27, 45, 75, 50, 70, 50, 250, 30),
('Rye', 2.8, 4.2, 10, 22, 18, 48, 15, 55, 65, 265, 28),
('Straw', 5.8, 6.3, 18, 24, 35, 64, 20, 60, 50, 250, 28),
('Sugar Beet', 4.7, 7.2, 15, 22, 30, 50, 25, 55, 70, 280, 35),
('Vegetables', 3, 7.5, 18, 25, 20, 50, 35, 65, 75, 350, 35),
('Wheat', 6, 6.8, 20, 30, 40, 60, 35, 65, 100, 450, 45);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `crops`
--
ALTER TABLE `crops`
  ADD PRIMARY KEY (`crop`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
