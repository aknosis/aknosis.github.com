--- 
layout: post
title: "Automating MySQL Database Backups on the Command Line via mysqldump "
wordpress_id: 278
wordpress_url: http://www.aknosis.com/?p=278
date: 2009-10-25 22:54:30 -07:00
comments: true
---
<h2>Are you tired of manually running backups when you remember to?</h2>
If you are running your own server, or have access to the shell and cron jobs this tip is for you!

First off for a better understanding of mysqldump check out the <a href="http://dev.mysql.com/doc/refman/5.0/en/mysqldump.html" target="_blank">MySQL reference manual</a>. All mysqldump really does is output the necessary queries to rebuild your database to the current state it is at when run.

First I'm going to create a test database and some tables as examples:

<!--more-->

<pre>
mysql> CREATE DATABASE test;
Query OK, 1 row affected (0.00 sec)
mysql> USE test;
Database changed
mysql> CREATE TABLE foo (id INT(10), val CHAR(10));
mysql> SHOW TABLES;
+----------------+
| Tables_in_test |
+----------------+
| foo            |
| foo2           |
+----------------+
2 rows in set (0.00 sec)
mysql> INSERT INTO foo VALUES (1,'a');
mysql> INSERT INTO foo VALUES (2,'b');
mysql> INSERT INTO foo VALUES (3,'c');
mysql> INSERT INTO foo VALUES (4,'d');
mysql> INSERT INTO foo VALUES (5,'e');
mysql> SELECT * FROM foo;
+------+------+
| id   | val  |
+------+------+
|    1 | a    |
|    2 | b    |
|    3 | c    |
|    4 | d    |
|    5 | e    |
+------+------+
5 rows in set (0.00 sec)
mysql> INSERT INTO foo2 VALUES (26,'z');
mysql> SELECT * FROM foo2;
+------+------+
| id2  | val2 |
+------+------+
|   26 | z    |
+------+------+
1 row in set (0.00 sec)
</pre>

Ok, so now we have our test database with two tables and some data in each table. Now to run mysqldump. The first parameters you have to have are your username and password and finally the database you want to backup.

<pre>
[aknosis@server ~]$ mysqldump -u msyql_user -pmysql_password test
-- MySQL dump 10.11
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version       5.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `foo`
--

DROP TABLE IF EXISTS `foo`;
CREATE TABLE `foo` (
`id` int(10) default NULL,
`val` char(10) default NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `foo`
--

LOCK TABLES `foo` WRITE;
/*!40000 ALTER TABLE `foo` DISABLE KEYS */;
INSERT INTO `foo` VALUES (1,'a'),(2,'b'),(3,'c'),(4,'d'),(5,'e');
/*!40000 ALTER TABLE `foo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foo2`
--

DROP TABLE IF EXISTS `foo2`;
CREATE TABLE `foo2` (
`id2` int(10) default NULL,
`val2` char(10) default NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `foo2`
--

LOCK TABLES `foo2` WRITE;
/*!40000 ALTER TABLE `foo2` DISABLE KEYS */;
INSERT INTO `foo2` VALUES (26,'z');
/*!40000 ALTER TABLE `foo2` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2009-10-26  5:12:09
</pre>

So what you see if the exact output of mysqldump, it literally dumps your entire database to stdout. Lets analyze this output a little.

<pre>
'Program Version Number'
-- MySQL dump 10.11
--
'Host Dump was from and the datbase dump'
-- Host: localhost    Database: test
-- ------------------------------------------------------
'Server Version'
-- Server version       5.1

'These odd characters are meant to keep the sql backwards compatible. Basically based on the version number (!4.0101) it says to set these variables.'
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `foo`
--

'Create the foo table (you will see the create statement is the same as mine from above with a few defaults added that I didt set myself)'
'Note that if you were to import this script it would wipe out any changes made to the database after this backup is created, because of the DROP TABLE statement'
DROP TABLE IF EXISTS `foo`;
CREATE TABLE `foo` (
`id` int(10) default NULL,
`val` char(10) default NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `foo`
--

'Lock tales and fill it in with the data'
LOCK TABLES `foo` WRITE;
/*!40000 ALTER TABLE `foo` DISABLE KEYS */;
INSERT INTO `foo` VALUES (1,'a'),(2,'b'),(3,'c'),(4,'d'),(5,'e');
/*!40000 ALTER TABLE `foo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foo2`
--

'Create the second table'
DROP TABLE IF EXISTS `foo2`;
CREATE TABLE `foo2` (
`id2` int(10) default NULL,
`val2` char(10) default NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `foo2`
--

'Fill it up just as the first one'
LOCK TABLES `foo2` WRITE;
/*!40000 ALTER TABLE `foo2` DISABLE KEYS */;
INSERT INTO `foo2` VALUES (26,'z');
/*!40000 ALTER TABLE `foo2` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

'Set more version specific variables'
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

'A timestamp for good measure'
-- Dump completed on 2009-10-26  5:12:09
</pre>

Now that we know what mysqldump is doing lets make proper use of the command

<pre>
[aknosis@server ~]$ mysqldump -u mysql_user -pmysql_pass test > /tmp/test.sql
</pre>

This says dump the output above to a file, we can go a step further and compress that file with tar. (Although useless in this instance a 2GB backup can easily be compressed to around 300MB since it is all text which compresses well)

<pre>
[aknosis@server ~]$  cd /tmp
[aknosis@server ~]$  tar -czf test.tgz test.sql
</pre>

So now you have all the steps you need to create a full point-in-time MySQL database backup and compress the output to save on transfer time and disk space. Dump that code into a cronjob and your automation is complete!

Here is how it could look as a bash script, say mysqlbackup.sh

<pre>
#!/bin/bash
#Run the dump
/usr/bin/mysqldump -u mysql_user -pmysql_password test > /tmp/test.sql
#Move to temp directory
cd /tmp
#Compress the sql
tar -czf test.tgz test.sql
#Delete the sql (you really don't want that data hanging around do you??)
rm test.sql
#Move the backup somewhere useful
mv test.tgz /my/network_attached_storage
</pre>

And the cronjob:

<pre>
@daily /home/user/scripts/mysqlbackup.sh
</pre>

That's it, a fairly mundane task that can be a live saver when needed.
