--- 
layout: post
title: Parsing a CSV file with ASP
wordpress_id: 60
wordpress_url: http://www.aknosis.com/?p=60
date: 2009-02-12 23:31:52 -07:00
---
I'm no fan of ASP especially after having to work with it... but regardless I had to.

Problem:

I don't want to try and get a database running for a simple task that would require one table with few rows, but I also didn't want to jump in and edit html when one small change had to take place.

Solution:

Build a csv file and use asp to parse it.

It still doesn't make much sense to me but what it does basically pushes all the data into one giant line like (a1,b1,c1,d1,a2,b2,c2,d2) and it counts the number of columns and rows you have. The for loop then uses these number to put it into a multi-dimensional array based off of (row,column)
Here is the code:
<pre>csv_to_read="csvfile.csv"
set fso = createobject("scripting.filesystemobject")
set act = fso.opentextfile(server.mappath(csv_to_read))
imported_text = act.readline
imported_text = replace(imported_text,chr(13),",")
imported_text = replace(imported_text,chr(34),"")
split_text=split(imported_text,",")
num_imported=ubound(split_text)+1
total_imported_text = act.readall
total_imported_text = replace(total_imported_text,chr(13),",")
total_imported_text = replace(total_imported_text,chr(34),"")
total_split_text=split(total_imported_text,",")
total_num_imported=ubound(total_split_text)
trows = (total_num_imported/ (num_imported)-1)
'Have to pre-initialize the size of the array
Dim array(10,25)
count=0
for column = 0 to trows
	for row = 0 to num_imported -1
	array(row,column) = total_split_text(count)
	count=count+1
	next
Next</pre>
To pull a single value out of that (passed via url like file.asp?z=7) I do the following:
<pre>input=CInt(Request.QueryString("z"))
'Fill up the variables I need until they are what was actually passed in url and exit
For i = 0 to trows
	id = CInt(Replace(array(0,i),chr(10),""))
	title = array(1,i)
	price = array(2,i)
	If id = input Then
		Exit For
	End If
Next

'Now I go on my merry way and use the variables as needed:
    &lt;h1&gt;&lt;% Response.Write(title) %&gt;&lt;/h1&gt;
    &lt;h2&gt;&lt;% Response.Write(price) %&gt;&lt;/h2&gt;</pre>
Conclusion

This wasn't quick to figure out but it is dirty and I only wrote it because I have 0 asp knowledge and did not want to try and learn how to connect asp to a MySQL or SQL Server at GoDaddy (not worth the trouble, and gladly I'll be moving this site to my own server soon enough)

One thing I can't argue with in a situation like this is if it's not broken, don't fix it!

Another intersted bit of code I had to figure out to do in asp was to always print the last day of the current month. I will post that code soon.

-Ak
