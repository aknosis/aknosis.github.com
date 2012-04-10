--- 
layout: post
title: Optimizing Website Peformance with a CDN (jQuery)
wordpress_id: 144
wordpress_url: http://www.aknosis.com/?p=144
date: 2009-10-02 22:11:17 -07:00
comments: true
---
If you want to increase load times for your site a good way is to serve your resources (js/images/css) from different hosts. Even better is to use a CDN (<a href="http://en.wikipedia.org/wiki/Content_delivery_network">Content Delivery Network)</a> that has edge locations, see Amazon's <a href="http://aws.amazon.com/cloudfront/">CloudFront</a>, that will serve those resources from hosts that are nearest to your viewers. If it is logistcally possibly for your needs and its free is there any reason not to? Yes.

Specifically if you use jQuery on any of your sites more than likely you serve it with every page on your site, so if you want to have one less request for every page just use a free CDN to host it: <a href="http://code.google.com/apis/ajaxlibs/documentation/">Google</a> / <a href="http://weblogs.asp.net/scottgu/archive/2009/09/15/announcing-the-microsoft-ajax-cdn.aspx">Microsoft </a>

A recent blog post @ <a href="http://elijahmanor.com/webdevdotnet/post/Increase-Your-Website-Performance-by-Hosting-jQuery-with-a-CDN.aspx" target="_blank">elijahmanor.com</a> explains more why you would want to do such a thing. However, a commenter on that blog post has a good point... If I point my jquery resource at one of these cdn's how do I know that the files are being served since it is all client side? What's worse is how much functionality is broken if jquery is 404'd from that CDN?

Well here's a little trick that you can use verify that jQuery is loaded and how to handle it if not:

<!--more-->

{% codeblock lang:html %}
//load google jquery
<script language="javascript" type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
<script type="text/javascript" language="javascript">
//if it didn't work load microsoft
	if(typeof jQuery != 'function'){
		document.write('<scr'+'ipt language="javascript" type="text/javascript" src="http://ajax.microsoft.com/ajax/jquery/jquery-1.3.2.min.js"></sc'+'ript>');
	}
</script>
/*
* You can test again if you want, although you are losing precious time for
* each attempt, it is probably best to try once and then load a local version
*/
<script type="text/javascript" language="javascript">
//if it didn't work load local
	if(typeof jQuery != 'function'){
		document.write('<scr'+'ipt language="javascript" type="text/javascript" src="js/jquery-1.3.2.min.js"></sc'+'ript>');
	}
</script>
{% endcodeblock  %}

It does work, you can verify by just changing the src on any of the &lt;script&gt; tags. I always put the script tags at the bottom of my pages (see yahoo link below), but I think in this instance I would put it in the head just to get it done sooner.

Here are some more tips to help optimize your website performance: <a href="http://developer.yahoo.com/performance/rules.html">http://developer.yahoo.com/performance/rules.html</a>
