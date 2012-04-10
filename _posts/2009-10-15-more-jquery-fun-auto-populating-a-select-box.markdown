--- 
layout: post
title: More jQuery Fun - Auto Populating a Select Box
wordpress_id: 185
wordpress_url: http://www.aknosis.com/?p=185
date: 2009-10-15 23:10:28 -07:00
---
<h3>Note: This post was updated 8/2/2011 to include jsfiddle code snippets and better/smarter code overall. Enjoy!</h3>
Problem: You want to dynamically populate a select box and you don't know how.

Solution: Easy, I will show you.

First off, I lied there is no built in way in jQuery (why?, I don't know) to automatically populate a select box. But it actually is very easy. There are plenty of methods to accomplish this but I like to do it this was because utilizes the <a href="http://docs.sun.com/source/816-6408-10/option.htm">Option object</a> and it doesn't require html string concatenation.
<h2>The basics</h2>
Example 1:

[iframe_loader src="http://jsfiddle.net/aknosis/NKQRe/embedded/result,js,html/" width="100%" height="300"]

Here is the code for the onclick event of that button:<!--more-->
<pre><span class="Apple-style-span" style="font-family: Georgia, 'Times New Roman', 'Bitstream Charter', Times, serif; font-size: 15px; font-weight: bold; line-height: 19px; white-space: normal;">More Dynamic</span></pre>
In this example I will populate the 2nd select box based on the value of the first one.

Example 2:

This time when I change something in the first sel, it does the changing of the second select box.

[iframe_loader src="http://jsfiddle.net/aknosis/5wRX9/embedded/result,js,html/" width="100%" height="300"]

<h3>What now?</h3>
There are many paths you can go down to make your select boxes dynamic, whether that is auto populating them, adding or removing single values, making them submit forms, submitting ajax calls to populate etc. etc. The key to making your life easier is to understand the way the select element is handled. Think of it as an array of element objects (which it is), at each index is an option and each option has text and a value.

[iframe_loader src="http://jsfiddle.net/aknosis/H7aGc/embedded/result,js,html/" width="100%" height="300"]

Need help implementing a specific example? Just ask in a comment!
