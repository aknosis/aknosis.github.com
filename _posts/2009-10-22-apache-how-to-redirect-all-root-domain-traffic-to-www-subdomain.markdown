--- 
layout: post
title: "Apache: How to redirect all root domain traffic to www subdomain"
wordpress_id: 269
wordpress_url: http://www.aknosis.com/?p=269
date: 2009-10-22 22:37:20 -07:00
---
Problem: Traffic comes to http://aknosis.com/something/ but they really need to go to http://www.aknosis.com/something/.

Solution: 301 Redirect via Apache with mod_rewrite.

Simple easy addition to your httpd.conf or .htaccess, I placed mine right above my wordpress mod_rewrite rules. If you are using .htaccess just dump it in that file above the wordpress redirect, if you having your rewrite rules in your httpd.conf then it needs to go inside the  container:
<pre>&lt;Directory /www/mydir/&gt;
        RewriteEngine On
        RewriteCond %{HTTP_HOST} !^www\.aknosis\.com$ [NC]
        RewriteRule ^(.*)$ http://www.aknosis.com/$1 [R=301,L]
#Wordpress Here
        RewriteBase /
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.php [L]
&lt;/Directory&gt;
</pre>
Breakdown:
<pre>RewriteCond %{HTTP_HOST} !^www\.aknosis\.com$ [NC]
If the HTTP_HOST header doesn't equal www.aknosis.com then :
RewriteRule ^(.*)$ http://www.aknosis.com/$1 [R=301,L]
Use the rewrite rule to push the request to http://www.aknosis.com/
^ - Beginning of request uri
() - Means group this into $1
$ - End of request uri
http://www.aknosis.com/$1 - Rewrite to this ($1 = the request uri)
[R=301 - Use a 301 Redirect
,L] - Make this the final rewrite rule and go</pre>
Try it out, go here (<a href="http://aknosis.com/">http://aknosis.com/</a>) and you end up here (<a href="http://www.aknosis.com/">http://www.aknosis.com/</a>). You can see the actual redirect in firebug's net tab:
<p style="text-align: center;"><a href="http://www.aknosis.com/akwp/wp-content/uploads/2009/10/firebug-redirect.jpg"><img class="size-full wp-image-272 aligncenter" title="firebug-redirect" src="http://www.aknosis.com/akwp/wp-content/uploads/2009/10/firebug-redirect.jpg" alt="firebug-redirect" width="619" height="112" /></a></p>
