--- 
layout: post
title: "Quicktip: Random string in unix"
wordpress_id: 496
wordpress_url: http://aknosis.com/?p=496
date: 2011-07-12 15:07:11 -07:00
---
[gist id=1079084]

echo `&lt;/dev/urandom tr -dc A-Za-z0-9 | head -c8`

[/gist]

[shell]
nas:~# echo `&lt;/dev/urandom tr -dc A-Za-z0-9 | head -c8`
8vxeuIfi
[/shell]
