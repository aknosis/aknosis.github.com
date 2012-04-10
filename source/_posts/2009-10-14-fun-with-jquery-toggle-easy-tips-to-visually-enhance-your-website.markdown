--- 
layout: post
title: Fun with jQuery - toggle() - Easy tips to visually enhance your website
wordpress_id: 169
wordpress_url: http://www.aknosis.com/?p=169
date: 2009-10-14 00:06:26 -07:00
comments: true
---
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
<script>
	$.noConflict();
</script>
Here's a quick tip to add some cool effects with jQuery that require very little code to implement. In this example I'm going to so how use of the toggle function can make the simplest functionality and jazz it up.
<h2><a href="http://docs.jquery.com/Effects/toggle">.toggle()</a></h2>
In a nutshell, the toggle function will call the show() function if your element isn't visible and the hide() function if it is.
<input class="button" onclick="jQuery('#preview1').toggle();" type="button" value="Hide My Menu" />
<ul id="preview1">
	<li>Hamburger</li>
	<li>Philly Cheese Steak</li>
	<li>Taco</li>
	<li>Pizza</li>
	<li>Something else greasy and unhealthy</li>
</ul>
{% codeblock lang:html %}
<input onclick="$('#preview1').toggle();" type="button" value="Toggle My Menu" />
{% endcodeblock %}


So as expected, clicking the button will toggle the menu. Now lets get a little more flashy:
<!--more-->
<input class="button" onclick="jQuery('#preview2').toggle('slow');" type="button" value="Hide My Menu" />
<ul id="preview2">
	<li>Hamburger</li>
	<li>Philly Cheese Steak</li>
	<li>Taco</li>
	<li>Pizza</li>
	<li>Something else greasy and unhealthy</li>
</ul>
{% codeblock lang:html %}
<input onclick="$('#preview2').toggle('slow');" type="button" value="Toggle My Menu" />
{% endcodeblock %}


Now you have a 'sliding' type effect for showing and hiding contents all with about 40 extra characters of text.
Want to be a bit more 'dynamic'?
<input id="menuToggler" class="button" onclick="jQuery('#preview3').toggle('slow',function(){if(jQuery(this).is(':visible')){jQuery('#menuToggler').val('Hide My Menu');}else{jQuery('#menuToggler').val('Show My Menu');}});" type="button" value="Hide My Menu" />
<ul id="preview3">
	<li>Hamburger</li>
	<li>Philly Cheese Steak</li>
	<li>Taco</li>
	<li>Pizza</li>
	<li>Something else greasy and unhealthy</li>
</ul>
{% codeblock lang:html %}
<input class="button" id="menuToggler" onclick="$('#preview3').toggle('slow',function(){if($(this).is(':visible')){$('#menuToggler').val('Hide My Menu');}else{$('#menuToggler').val('Show My Menu');}});" type="button" value="Hide My Menu" />
{% endcodeblock %}


Here is better formatted javascript:

{% codeblock lang:js %}
$('#preview3').toggle('slow',
	function(){
		if($(this).is(':visible')){
			$('#menuToggler').val('Hide My Menu');
		}else{
			$('#menuToggler').val('Show My Menu');
		}
	}
);
{% endcodeblock  %}


What happens here is I have now created a function that is called once the toggle animation is done, it checks to see if the menu is visible and changes the buttons value based on that check.

As I said before, toggle just does the math and executes a hide or show on the element. Here is an example of the same thing using hide and show seperately.
<input class="button" onclick="jQuery('#preview4').hide('slow');" type="button" value="Hide My Menu" />
<input class="button" onclick="jQuery('#preview4').show('slow');" type="button" value="Show My Menu" />
<ul id="preview4">
	<li>Hamburger</li>
	<li>Philly Cheese Steak</li>
	<li>Taco</li>
	<li>Pizza</li>
	<li>Something else greasy and unhealthy</li>
</ul>
{% codeblock lang:html %}
<input class="button" onclick="$('#preview4').hide('slow');" type="button" value="Hide My Menu" />
<input class="button" onclick="$('#preview4').show('slow');" type="button" value="Show My Menu" />
{% endcodeblock %}

Stay tuned for more fun with <a href="http://www.aknosis.com/tag/jquery/">jQuery</a>, my favorite JavaScript library. <a href="http://jquery.com/">http://jquery.com/</a>
