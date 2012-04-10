--- 
layout: post
title: Creating JSON as a select result in a MySQL Query
wordpress_id: 45
wordpress_url: http://www.aknosis.com/?p=45
date: 2009-01-12 22:18:30 -07:00
---
So I had this crazy idea at work, I needed to get all the data out of an entire table in a single column. So I decided to return the table as a preformatted JSON array that I could decode straight into a php array for manipulation.

The Code:
<!--more-->

Suppose a table format like so: (forgive my crude mysql client output attempt)
<code>
-----------------------
id (int)      |      val (int)
------------------------
-        1        |         2              -
-    3   |          4              -
------------------------
</code>

<code>SELECT CONCAT('{',CAST(GROUP_CONCAT(CONCAT('"',table.key,'":',table.value))  AS CHAR),'}') AS alias FROM table GROUP BY table.id</code>

Your result would be something like:
<code>{"1":2,"3":4}</code>

Now you can pump this straight into a json_decode function and manipulate it as you please.

<em>Note</em>:
<ul>
	<li>This is probably not the best method when returning more than a couple rows and your table you are building this array from doesn't have a huge number or rows either.</li>
	<li>This doesn't account for proper escaping to flow properly into json_decode (think string with quotes) but should be flawless if you table is only integer based.</li>
	<li>The data type of your keys here (1 &amp; 3 in the example) will show up as string because of the quotes, if you want to drop the quotes they should come back as integers when converted in the json_decode
<ul>
	<li>If you add quotes around the value (2 &amp; 4) they will be treated as strings</li>
	<li>If you had a simple table with numeric id &amp; a alphanumeric value you would be safe to use this if you quoted the value</li>
</ul>
</li>
	<li>Requires: PHP 5 &gt;= 5.2.0, OR  PECL json &gt;= 1.2.0</li>
	<li>A new function is available in php 5.3.0 - <a href="http://php.net/manual/en/function.json-last-error.php" target="_blank">json_last_error</a></li>
</ul>
