--- 
layout: post
title: Backing Up XenServer VMs via Command Line
wordpress_id: 354
wordpress_url: http://www.aknosis.com/?p=354
date: 2010-09-25 08:41:21 -07:00
---
Quick and easy steps to backup a vm via the command line.

On your host server:

[text]
[root@xenhost ~]# xe vm-list
-- Note your vm's uuid here (you can use tab completion to autofill in the uuid so no need to copy entirely) --
[root@xenhost ~]# xe vm-shutdown uuid=x
[root@xenhost ~]# xe vm-export uuid=x filename=/backup/vmfile.xva
[/text]

It's that simple.
