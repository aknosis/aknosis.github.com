--- 
layout: post
title: "Quicktip: Check if a class constant exists in PHP"
wordpress_id: 487
wordpress_url: http://aknosis.com/?p=487
date: 2011-06-29 09:55:19 -07:00
---
[gist id=1054257]
<!--?php <br ?--> if(defined('className::CONSTANT_NAME')){
//defined
}else{
//not defined
}
[/gist]
