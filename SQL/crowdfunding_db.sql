-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: crowdfunding_db
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `CATEGORY_ID` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`CATEGORY_ID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Health'),(2,'Education'),(3,'Environment'),(4,'Sports'),(5,'Arts'),(6,'Technology'),(7,'Community Development'),(8,'Animal Welfare'),(9,'Disaster Relief');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donation`
--

DROP TABLE IF EXISTS `donation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation` (
  `DONATION_ID` int NOT NULL AUTO_INCREMENT,
  `DATE` datetime NOT NULL,
  `AMOUNT` decimal(10,2) NOT NULL,
  `GIVER` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `FUNDRAISER_ID` int DEFAULT NULL,
  PRIMARY KEY (`DONATION_ID`) USING BTREE,
  KEY `FUNDRAISER_ID` (`FUNDRAISER_ID`) USING BTREE,
  CONSTRAINT `donation_ibfk_1` FOREIGN KEY (`FUNDRAISER_ID`) REFERENCES `fundraiser` (`FUNDRAISER_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation`
--

LOCK TABLES `donation` WRITE;
/*!40000 ALTER TABLE `donation` DISABLE KEYS */;
INSERT INTO `donation` VALUES (89,'2024-10-12 00:15:59',500.00,'Michael Brown',1),(90,'2024-10-12 00:15:59',1000.00,'Emily Davis',1),(91,'2024-10-12 00:15:59',1500.00,'Jessica Wilson',2),(92,'2024-10-12 00:15:59',200.00,'Daniel Garcia',3),(93,'2024-10-12 00:15:59',300.00,'Matthew Martinez',4),(94,'2024-10-12 00:15:59',100.00,'Sophia Lopez',5),(95,'2024-10-12 00:15:59',1200.00,'David Anderson',6),(96,'2024-10-12 00:15:59',700.00,'Sarah Thomas',1),(97,'2024-10-12 00:15:59',50.00,'James Robinson',3),(98,'2024-10-12 00:15:59',400.00,'Linda Hernandez',4),(99,'2024-10-12 00:15:59',150.00,'Emily Clark',2),(100,'2024-10-12 00:15:59',250.00,'Mason Rodriguez',1),(101,'2024-10-12 00:15:59',600.00,'Olivia Hall',5),(102,'2024-10-12 00:15:59',300.00,'Ava Allen',6),(103,'2024-10-12 00:15:59',500.00,'Isabella Young',7),(104,'2024-10-12 00:15:59',250.00,'Ethan King',8),(105,'2024-10-12 00:15:59',300.00,'Emma Wright',9),(106,'2024-10-12 00:24:58',5.00,'zz',3);
/*!40000 ALTER TABLE `donation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fundraiser`
--

DROP TABLE IF EXISTS `fundraiser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fundraiser` (
  `FUNDRAISER_ID` int NOT NULL AUTO_INCREMENT,
  `ORGANIZER` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CAPTION` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `TARGET_FUNDING` decimal(10,2) NOT NULL,
  `CURRENT_FUNDING` decimal(10,2) NOT NULL DEFAULT '0.00',
  `CITY` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ACTIVE` int DEFAULT NULL,
  `CATEGORY_ID` int DEFAULT NULL,
  PRIMARY KEY (`FUNDRAISER_ID`) USING BTREE,
  KEY `CATEGORY_ID` (`CATEGORY_ID`) USING BTREE,
  CONSTRAINT `fundraiser_ibfk_1` FOREIGN KEY (`CATEGORY_ID`) REFERENCES `category` (`CATEGORY_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fundraiser`
--

LOCK TABLES `fundraiser` WRITE;
/*!40000 ALTER TABLE `fundraiser` DISABLE KEYS */;
INSERT INTO `fundraiser` VALUES (1,'John Doe','Help Build a School',50000.00,2500.00,'New York',1,1),(2,'Jane Smith','Save the Rainforest',100000.00,3000.00,'San Francisco',1,2),(3,'Charlie Brown','Community Health Initiative',75000.00,1505.00,'Chicago',1,1),(4,'Alice Johnson','Local Sports Club',30000.00,800.00,'Los Angeles',1,4),(5,'Bob Williams','Art for Everyone',20000.00,600.00,'Miami',1,5),(6,'Emma Wilson','Tech for Kids',45000.00,1200.00,'Seattle',1,6),(7,'Michael Brown','Community Garden Project',25000.00,400.00,'Austin',1,7),(8,'Sophia Davis','Animal Rescue Initiative',35000.00,700.00,'Denver',1,8),(9,'Daniel Johnson','Disaster Relief Fund',80000.00,1000.00,'Orlando',1,9),(10,'Lucas Martinez','Support Local Artists',60000.00,1800.00,'San Diego',1,5);
/*!40000 ALTER TABLE `fundraiser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'crowdfunding_db'
--

--
-- Dumping routines for database 'crowdfunding_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-12 21:45:32
