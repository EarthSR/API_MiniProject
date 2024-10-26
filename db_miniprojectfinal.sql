CREATE DATABASE  IF NOT EXISTS `db_miniprojectfinal` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_miniprojectfinal`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: db_miniprojectfinal
-- ------------------------------------------------------
-- Server version	8.4.0

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
-- Table structure for table `age`
--

DROP TABLE IF EXISTS `age`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `age` (
  `age_ID` int NOT NULL AUTO_INCREMENT,
  `age_Date` date NOT NULL,
  `age_Percent` decimal(5,2) DEFAULT NULL,
  `age_result` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`age_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `age`
--

LOCK TABLES `age` WRITE;
/*!40000 ALTER TABLE `age` DISABLE KEYS */;
INSERT INTO `age` VALUES (3,'2024-10-24',NULL,'17.43573570251465'),(4,'2024-10-24',NULL,'18.69042205810547'),(5,'2024-10-24',NULL,'18.69042205810547'),(6,'2024-10-24',NULL,'18.69042205810547'),(7,'2024-10-24',NULL,'17.43573570251465'),(8,'2024-10-24',NULL,'18.69042205810547'),(9,'2024-10-24',NULL,'18.69042205810547'),(10,'2024-10-24',NULL,'18.69042205810547'),(11,'2024-10-24',NULL,'18.6904354095459'),(12,'2024-10-24',NULL,'18.6904354095459'),(13,'2024-10-24',NULL,'18.6904354095459'),(14,'2024-10-24',NULL,'18.6904354095459'),(15,'2024-10-24',NULL,'18.6904354095459'),(16,'2024-10-24',NULL,'18.6904354095459'),(17,'2024-10-24',NULL,'18.6904354095459'),(18,'2024-10-24',NULL,'18.6904354095459'),(19,'2024-10-24',NULL,'18.6904354095459'),(20,'2024-10-24',NULL,'15.123098373413086'),(21,'2024-10-24',NULL,'15.123098373413086'),(22,'2024-10-24',NULL,'16.672527313232422'),(23,'2024-10-24',NULL,'16.672527313232422'),(24,'2024-10-24',NULL,'17.866783142089844'),(25,'2024-10-24',NULL,'15.123098373413086'),(26,'2024-10-24',NULL,'16.672527313232422'),(27,'2024-10-24',NULL,'18.091543197631836'),(28,'2024-10-24',NULL,'17.43573760986328'),(29,'2024-10-24',NULL,'17.43573760986328'),(30,'2024-10-24',NULL,'13.563892364501953'),(31,'2024-10-24',NULL,'18.37539291381836'),(32,'2024-11-24',NULL,'14.30174446105957'),(33,'2024-10-24',NULL,'14.30174446105957'),(34,'2024-10-24',NULL,'17.361099243164062'),(35,'2024-11-24',NULL,'17.43573760986328'),(36,'2024-10-24',NULL,'17.866788864135742'),(37,'2024-10-24',NULL,'17.866788864135742'),(38,'2024-10-24',NULL,'17.866788864135742');
/*!40000 ALTER TABLE `age` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `Role_ID` int NOT NULL AUTO_INCREMENT,
  `Type_Name` varchar(50) NOT NULL,
  PRIMARY KEY (`Role_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'user'),(2,'admin');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `similarity`
--

DROP TABLE IF EXISTS `similarity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `similarity` (
  `similarity_ID` int NOT NULL AUTO_INCREMENT,
  `similarity_Date` date NOT NULL,
  `similarityDetail_Percent` decimal(5,2) DEFAULT NULL,
  `ThaiCelebrities_ID` int DEFAULT NULL,
  PRIMARY KEY (`similarity_ID`),
  KEY `ThaiCelebrities_ID` (`ThaiCelebrities_ID`),
  CONSTRAINT `similarity_ibfk_1` FOREIGN KEY (`ThaiCelebrities_ID`) REFERENCES `thaicelebrities` (`ThaiCelebrities_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `similarity`
--

LOCK TABLES `similarity` WRITE;
/*!40000 ALTER TABLE `similarity` DISABLE KEYS */;
INSERT INTO `similarity` VALUES (12,'2024-10-24',35.08,87),(13,'2024-10-24',35.08,87),(14,'2024-10-24',55.26,89),(15,'2024-10-24',35.08,87),(16,'2024-12-24',55.26,89),(17,'2024-10-24',98.65,33),(18,'2024-10-24',35.08,87),(19,'2024-10-24',35.08,87),(20,'2024-10-24',98.65,33),(21,'2024-10-24',93.83,34),(22,'2024-10-24',88.32,3),(23,'2024-10-24',99.00,76),(24,'2024-10-24',87.02,97),(25,'2024-10-24',87.02,97),(26,'2024-10-24',87.02,97),(27,'2024-10-24',83.26,60),(28,'2024-10-24',88.32,3),(29,'2024-10-24',88.32,3),(30,'2024-10-24',93.54,68),(31,'2024-10-24',93.54,68),(32,'2024-10-24',93.54,68),(33,'2024-10-24',93.54,68),(34,'2024-10-24',93.54,68),(35,'2024-10-24',88.32,3),(36,'2024-10-24',99.86,82),(37,'2024-11-24',99.86,82),(38,'2024-10-24',99.86,82),(39,'2024-11-24',99.00,76),(40,'2024-10-24',88.32,3),(41,'2024-11-24',80.80,72),(42,'2024-10-24',99.98,56),(43,'2024-09-24',10.88,43),(44,'2024-10-24',93.83,34),(45,'2024-10-24',80.80,72),(46,'2024-10-24',99.00,76);
/*!40000 ALTER TABLE `similarity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thaicelebrities`
--

DROP TABLE IF EXISTS `thaicelebrities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thaicelebrities` (
  `ThaiCelebrities_ID` int NOT NULL AUTO_INCREMENT,
  `ThaiCelebrities_name` varchar(255) NOT NULL,
  PRIMARY KEY (`ThaiCelebrities_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thaicelebrities`
--

LOCK TABLES `thaicelebrities` WRITE;
/*!40000 ALTER TABLE `thaicelebrities` DISABLE KEYS */;
INSERT INTO `thaicelebrities` VALUES (1,'ก้อง สมเกียรติ จันทรา'),(2,'ก้อง ห้วยไร่'),(3,'ก้อย รัชวิน'),(4,'กันต์ กันตถาวร'),(5,'กัปตัน ชลธร คงยิ่งยง'),(6,'เก่ง ธชย'),(7,'เก้า สุภัสสรา'),(8,'เกียรติศักดิ์ เสนาเมือง\n'),(9,'โก๊ะตี๋'),(10,'ขวัญ อุษามณี'),(11,'คิตตี้ ชิชา อมาตยกุล'),(12,'คิมเบอร์ลี่'),(13,'จ๋าย ไททศ'),(14,'เจ๊ดำ ศุภชัย หนุมาศ'),(15,'เจมส์ จิรายุ'),(16,'เจมส์ มาร์'),(17,'แจ็ค แฟนฉัน'),(18,'แจ๊ส ชวนชื่น'),(19,'โจอี้ ภูวศิษฐ์'),(20,'เชฟเอียน'),(21,'เฌอปราง อารีย์กุล'),(22,'ญาญ่า อุรัสยา'),(23,'ณเดชน์'),(24,'ดา เอ็นโดรฟิน'),(25,'เดอะทอยส์'),(26,'ตรี ภรภัทร'),(27,'ต่อ'),(28,'ต่าย อรทัย'),(29,'เต้ย - จรินทร์พร จุนเกียรติ'),(30,'เต้ย อภิวัฒน์'),(31,'เต๋อ ฉันทวิชช์'),(32,'แต้ว ณฐพร'),(33,'เท่ง'),(34,'โทนี่ จา'),(35,'โทนี่รากแก่น'),(36,'ธีรเดช เมธาวรายุทธ'),(37,'นนกุล ชานน'),(38,'นนน กรภัทร์ เกิดพันธุ์'),(39,'น้องอินเตอร์ รุ่งรดา รุ่งลิขิตเจริญ'),(40,'นัท นิสามณี'),(41,'น้าค่อม'),(42,'น้าเต้ย นิธิ ท้วมประถม'),(43,'นาย ณภัทร'),(44,'น้ําตาล พิจักขณา'),(45,'นุนิว ชวรินทร์'),(46,'เนย โชติกา'),(47,'บอยปกรณ์'),(48,'บัวขาว'),(49,'บิวกิ้น'),(50,'บุ๋มปนัดดา'),(51,'โบกี้ไลอ้อน'),(52,'โบว์เมลดา'),(53,'ใบเฟิร์น พิมพ์ชนก'),(54,'ไบร์ท วชิรวิชญ์ ชีวอารี'),(55,'ป๋องกพล เรือจ้าง'),(56,'ปองกูล สืบซึ้ง'),(57,'ปาล์มมี่'),(58,'พร้อม ราชภัทร'),(59,'พอร์ช ศรัณย์'),(60,'พิมมา'),(61,'พิมรี่พาย'),(62,'พีพี ปุญญ์ปรีดี'),(63,'แพต ชญานิษฐ์'),(64,'แพตตี้ อังศุมาลิน'),(65,'แพนเค้ก เขมนิจ'),(66,'แพร์ พิชชาภา'),(67,'มนต์แคน แก่นคูน'),(68,'มาเบล'),(69,'มายด์'),(70,'มาริโอ้ เมาเร่อ'),(71,'มาสุ จรรยางค์ดีกุล'),(72,'มิ้น ชาลิดา'),(73,'มิ้ม รัตนวดี'),(74,'โมส ไททศ'),(75,'ยอร์ช ยงศิลป์ วงศ์พนิตนนท์'),(76,'รถถัง จิตรเมืองนนท์'),(77,'ริว วชิรวิชญ์'),(78,'วิว วรรณรท'),(79,'วี วิโอเลต วอเทียร์'),(80,'วุ้นเส้น'),(81,'เวียร์ ศุกลวัฒน์'),(82,'สน ยุกต์'),(83,'สมิธ ภาสวิชญ์'),(84,'หนุ่ม กรรชัย'),(85,'หนูนา หนึ่งธิดา'),(86,'หมากปริญ'),(87,'หม่ำ'),(88,'โหน่ง'),(89,'ใหม่ ดาวิกา'),(90,'อเล็กซ์ อัลบอน'),(91,'ออกัส วชิรวิชญ์'),(92,'อะตอม ชนกันต์'),(93,'อ๊ะอาย กรณิศ'),(94,'อั้ม พัชราภา'),(95,'อิ้งค์ วรันธร'),(96,'เอแคร์ จือปาก'),(97,'เอมี่'),(98,'เอสเธอร์ สุปรีลีลา'),(99,'โอ๊ต ปราโมทย์'),(100,'โอบ นิธิ วิวรรธนวรางค์');
/*!40000 ALTER TABLE `thaicelebrities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `Users_ID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `Role_ID` int DEFAULT NULL,
  `failed_attempts` int DEFAULT '0',
  `lock_until` datetime DEFAULT NULL,
  PRIMARY KEY (`Users_ID`),
  KEY `Role_ID` (`Role_ID`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`Role_ID`) REFERENCES `role` (`Role_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','$2b$12$rh6UfUs3DY61t.dHzVW//OZPa5Op99dQ5/nQ7f9yh5Jr3Flo9rhmq',2,0,NULL),(2,'pichai','$2b$12$vfATXPZm/uUSQYnwylSe9ekdoRMjnwS52IdnPgPw.WJ1pbeZ/2wS6',2,0,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-24 20:06:29
