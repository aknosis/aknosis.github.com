--- 
layout: post
title: Using jQuery to rewrite all relative url's
wordpress_id: 56
wordpress_url: http://www.aknosis.com/?p=56
date: 2009-02-11 00:16:30 -07:00
---
<h3><em>This post has been revisited, see the newer version <a title="Using jQuery to rewrite relative urls to absolute urls – [revisited]" href="http://aknosis.com/2011/07/17/using-jquery-to-rewrite-relative-urls-to-absolute-urls-revisited/">here</a>.</em></h3>
<strong>Problem:</strong>

I have a template file that has all relative url's for all the links and I have this template on two different subdomains, one is used for processing and the other is for static files.
When I display something on my processing server I want it to make all the links point the the static pages without modifying the template.

<strong>Solution:</strong>

Use jQuery to parse all links and change to the proper domain.

<strong>Question:</strong>

Is there a better method that is automatic such as this? Or maybe a better way to write the jQuery as it stumped me to get it right for a bit.

Code:
<!--more-->

[javascript]
//Create an object of all links
var links = $('a');
//Parse each item in links object
for (var a in links){
//This will allow the for iteration to give the actual link objects that are
//referred to with numeric indexes and not objects that jQuery appends
//Object 'a' should be a number
	if(a == parseInt(a)){
		//Variable b is now the object that is links[a];
		var b = links[a];
		//Variable c is now variable b cast to jQuery so I can use built in jQuery functions
		var c = $(b);
		//Variable temp now contains the href of that link
		var temp = c.attr('href');
		//This should filter out any anchors in the page or any links without an href
		if(temp != undefined){
			//This checks to see if they are inline links, mailto link, OR absolute link
			//This isn't perfect in the case that your link was 'mailsomething.php' or any non http link (ftp or other protocol)
			//The correct scenario here is to use regex but I didn't have the patience
			//or time to do so, so I didn't plus I knew my links didn't apply to these caveats
			var test = temp.substring(0,4);
			if(test != 'mail' &amp;&amp; test != 'http' &amp;&amp; test != '#'){
				//Now we prepend the abosulte url with the proper and add the relative file location
				c.attr('href','http://differentsubdomain.domain.com/'+temp);
			}
		}
	}
}
[/javascript]

My page has 93 links in the template and this doesn't seem to slow anything down, however this is probably a bad idea on a fully production website because you have a race condition since it is done on the clientside, where they might try to access the relative file on your current domain rather than the modified one once the jquery is done.

I chose this again because you only end up on this subdomain if you have submitted forms for processing and I need to still stay on the server for 1 page after processing, after that I need to link the page back to the original subdomain that contains the static webpage files.
