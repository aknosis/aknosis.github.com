--- 
layout: post
title: Recent Computer Build
wordpress_id: 99
wordpress_url: http://www.aknosis.com/?p=99
date: 2009-05-16 22:02:45 -07:00
comments: true
---
Just built a computer for a client and wanted to share my experience. Its been a while since I've built a complete system from scratch, but it is always enjoyable.

Specs:
<pre>XP SP3 OEM
(2) Western Digital Caviar SE 320GB 7200 RPM SATA 3.0Gb/s
	(RAID 1 Array) - WD3200AAJS
Western Digital Caviar Black 1TB 7200 RPM SATA 3.0Gb/s - WD1001FALS
AMD Phenom 8450 Toliman 2.1GHz Socket AM2+ 95W Triple-Core - HD8450WCGHBOX
CORSAIR 4GB (2 x 2GB) DDR2 800 Dual Channel Kit - TWIN2X4096-6400C5
ASUS M4N78 Pro (On board Gefore 8300 Video [DVI / HDMI / D-SUB])
LIAN LI PC-A05B (Includes a 550W PS)
Price Tag: Roughly $775</pre>
<!--more-->

The most difficult part about this build was dealing with the Lian Li case. First off I have to give kudos to Lian Li, they always have fine looking cases and are well worth the $$$. Some other nice things I got with the case: screwdriver for mb mount screws, zip ties, cable tie mount, rubber washers for hard drive screw mounts (helps quiet the system), both fans also come with rubber washers around the screws. The system is fairly quiet for the size of the fans it comes with.

Now on to the weirdness... This case is BACKWARDS, or updside down... Most cases I've ever deal with open on the left side of the case, the cpu is towards the top and all the pci slots and io ports are on the bottom. But take a look at the pictures and you'll notice that this fucker is wrong! It opens up from the right side and it totally threw me for a loop. The power supply actually sits underneath the harddrives and has a cable that strolls along to the back so you can stick you powersupply cable in the back like normal. If you snap off the front panel you have easy access to the powersupply and you can see that it does allow you to change it, it has a flat power connecter that goes to the back of the case. The PSU is sufficient as far as I can tell, I didn't use any of the molex connectors or PCIE and had just enough sata power connectors (3 hard drives and 1 sata dvd drive). I did like the fact that behind the 5.25 and hd slots there was a fair amount of room to hide all the power supply cables I didn't use, as well as the extra bulk of the atx power cable.

I had big problems installing the IO plate, I think the metal on the back is thicker than normal, I literally had to shave some of the case down where the io plate goes with a screw driver to get it to fit! I say big problem because I felt pretty lame 5 minutes into the build not being able to get an IO plate in...

The next headache was trying to install RAID without having a floppy drive... So after lots of blue screens and plenty of frustration I found: <a href="http://www.nliteos.com/" target="_blank">nlite</a>. This beauty of a program allowed me to create my own custom windows xp install disc. I setup the keyboard, timezone, cd key, network config, and most of all it allowed me to add my RAID drivers directly onto the install disc so I didn't have to deal with the no floppy drive deal (I fought trying to get my usb drive to emulate a fdd, but I couldn't seem to get it to work [the motherboard has the option to set a usb key to emulate a floppy]).

From the few things I've done the computer screams, but too bad it will probably under utilized for quite a while. However now I'm in the mood to upgrade my current computer although I know I should wait till windows 7...

Also something to note about the ASUS M4N78 PRO, I noticed someone on newegg complaining about the 'sli' and lack of multiple pcie ports... Although confusing the 'Hybrid SLI' which means that you can utilized the on board GeForce 8300 with your PCIE video card. For what it's worth I would rather get a more expensive motherboard and have true sli available, but having the onboard video, RAID, and AM3 slot support (for possible future upgrades) is why I sprung for this motherboard.


