--- 
layout: post
title: Using jQuery to rewrite relative urls to absolute urls - [revisited]
wordpress_id: 508
wordpress_url: http://aknosis.com/?p=508
date: 2011-07-17 00:38:03 -07:00
---
After scanning my site stats and realizing that an old post about <a title="Using jQuery to rewrite all relative urls" href="http://aknosis.com/2009/02/11/using-jquery-to-rewrite-all-relative-urls/">how to rewrite all the relative urls on a page with jQuery</a> was one of my most visited, I decided to review the code and noticed it could be improved. My knowledge of JavaScript and jQuery has improved immensely since that previous post and this revisit is an attempt to improve upon it.
<h4>Problem: Need to change all the relative urls on a page and replace with an absolute url.</h4>
Different from my other post I'm going to separate the concerns of this problem: 1 being selecting only the links that are relative and not inline or mailto: links; 2 modifying the href.
<h4>Selecting the links on a page</h4>
The jQuery standard $('a') will only solve half our problem because we only want links that are relative. There are several different methods we can use with jQuery to get exactly what you need, however first take into context what your page actually looks like. You may be able to save some time if your page has relatively few links, on the other hand if you have a page with hundreds of links you will need to chose your <a href="http://api.jquery.com/category/selectors/">selectors</a> wisely. To make the best and most informed decision, I suggest you test your various use cases @ <a href="http://jsperf.com/">http://jsperf.com/</a>.

Here are three that I came up with:

[javascript]
$('a').not('[href^=&quot;http&quot;],[href^=&quot;https&quot;],[href^=&quot;mailto:&quot;],[href^=&quot;#&quot;]');
$('a:not([href^=&quot;http:&quot;],[href^=&quot;https:&quot;],[href^=&quot;mailto:&quot;],[href^=&quot;#&quot;])');
$('a:not([href*=&quot;://&quot;],[href^=&quot;mailto:&quot;],[href^=&quot;#&quot;])');
[/javascript]

<!--more-->

<span class="Apple-style-span" style="font-family: Georgia, 'Times New Roman', 'Bitstream Charter', Times, serif; font-size: 13px; line-height: 19px; white-space: normal;"> I'm going to use the first one just because it is a little bit more succinct. Now that we have all of the relative links on the page we need modify the href for each one. </span>

[javascript]
$(function() {
//Use jQuerys .each() method to iterate over each link
        $('a').not('[href^=&quot;http&quot;],[href^=&quot;https&quot;],[href^=&quot;mailto:&quot;],[href^=&quot;#&quot;]').each(function() {
//Use .attr() to modify the href, when you provide a callback function
//the arguments passed are the attribute index and its value
            $(this).attr('href', function(index, value) {
//This fix solves the problem when you aren't at the root level of a site
// e.g. if you are at site.com/page1/ and the link href is &quot;do/something&quot;
// we need to make sure the absolute url becomes newsite.com/page1/do/something
// if we just prepended the new domain we would actually get newsite.comdo/something
// which obviously wouldn't work
                if (value.substr(0,1) !== &quot;/&quot;) {
                    value = window.location.pathname + value;
                }
//When you return from the callback function for .attr() it will set the attribute
//to this new value.
//We don't use a trailing slash on mynewurl.com because it will already exist if
//the href starts with a / or it will be part of window.location.pathname
                return &quot;http://mynewurl.com&quot; + value;
        });
    });
});
[/javascript]

Live example below, hover over the links to see the urls before, click the button and check them again, all of the relative links will become absolute with the new domain.

[iframe_loader src="http://jsfiddle.net/aknosis/kWrjr/embedded/js,html,result/" width="100%" height="300" click_words="test"]

Thanks for reading my post, I hope if was helpful.
