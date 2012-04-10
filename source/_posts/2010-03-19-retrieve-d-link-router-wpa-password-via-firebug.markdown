--- 
layout: post
title: Retrieve D-Link Router WPA Password via Firebug
wordpress_id: 333
wordpress_url: http://www.aknosis.com/?p=333
date: 2010-03-19 22:39:35 -07:00
comments: true
---
Well I've done it a million times, I forget my WPA password and each time a new device comes along I have to change it for them all. Well no more!

<!--more-->

My router is D-Link DGL-4300. All you need to make this work is <a href="http://getfirefox.com">Firefox </a>and <a href="http://getfirebug.com/">Firebug</a>. (Any javascript console should work)

Travel over to your nifty wireless settings page (http://192.168.0.1/Basic_Wireless.html) and open up your javascript console. Then type this: 
{% codeblock psk.js %}
data.wireless.wpa_psk 
{% endcodeblock %}
and you should see your nifty WPA password in the console.

Enjoy!
