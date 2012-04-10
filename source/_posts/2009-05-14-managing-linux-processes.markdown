--- 
layout: post
title: "Quick Tip: Managing Linux Processes"
wordpress_id: 97
wordpress_url: http://www.aknosis.com/?p=97
date: 2009-05-14 00:48:46 -07:00
comments: true
---
Quick tip on managing linux processes, I always end up asking myself this and having to research how to do such things. So here are some quick tips to help you manage your linux processes. This is all done in <a href="http://en.wikipedia.org/wiki/Bash" target="_blank">bash</a>, I'm not sure what is different with the other shells so <a href="http://en.wiktionary.org/wiki/your_mileage_may_vary" target="_blank">ymmv</a>.

Here is my sample script, just something that doesn't end right away so I can use it for proof of concept:
{% codeblock sleep.sh %}
#!/bin/bash
while [ 1 ]
do
	date
	echo "Sleeping 5 seconds"
	sleep 5
done
{% endcodeblock %}
<h2>Sending a process to the background</h2>
<!--more-->

<pre>
[aknosis@server ~]$ ./myscript.sh &amp;
[1] 17923
[aknosis@server ~]$ Thu May 14 00:19:24 MST 2009
Sleeping 5 seconds

[aknosis@server ~]$ Thu May 14 00:19:29 MST 2009
Sleeping 5 seconds
[aknosis@server ~]$</pre>
So you can see here I started myscript but I sent it directly to the background, I am freely able to run other commands.

Note: that the <a href="http://en.wikipedia.org/wiki/Standard_streams#Standard_output_.28stdout.29" target="_blank">stdout</a> is output to my terminal, which may or may not be the desired result, you need to redirect stdout/stderr to keep your terminal clean if you program has output you don't want to see or need to capture to a file.
<h2>Sending a current running process to background</h2>
So what if I started the program but I wanted to send it into the background while it was running interactively:
<pre>[aknosis@server ~]$ ./myscript.sh
Thu May 14 00:24:50 MST 2009
Sleeping 5 seconds
Thu May 14 00:24:55 MST 2009
Sleeping 5 seconds

[1]+  Stopped                 ./myscript.sh
[aknosis@server ~]$</pre>
What I did here was start my script, and you can see that I was never given control of the shell again. To stop the program push CTRL+Z and you will see the [1]+ Stopped. If the case is that you want to keep the process running in the background (like we did above) all you have to do is tell it to go to the background:
<pre>[aknosis@server ~]$ bg 1
[1]+ ./myscript.sh &amp;
[aknosis@server ~]$ Thu May 14 00:27:58 MST 2009
Sleeping 5 seconds
Thu May 14 00:28:03 MST 2009
Sleeping 5 seconds

[aknosis@server ~]$
[aknosis@server ~]$</pre>
The bg command says send job 1 to the background, the job number is the 1 that was displayed in square brackets when we did the CTRL+Z, as you can see it tells us that it sent myscript into the background with the &amp; symbol.
<h2>Bringing a process into the foreground</h2>
How do I regain control of the program once I've sent it to the background? Simple:
<pre>[aknosis@server ~]$
[aknosis@server ~]$ fg 1
./myscript.sh
Thu May 14 00:31:16 MST 2009
Sleeping 5 seconds</pre>
All I did here was say give me job 1 and put it into the foreground.

Other notes:

If you send more than one job to the background and get confused:
<pre>[aknosis@server ~]$ ./myscript.sh
Thu May 14 00:34:53 MST 2009
Sleeping 5 seconds

[1]+ Stopped ./myscript.sh</pre>
<pre>[aknosis@server ~]$ ./myscript.sh 2
Thu May 14 00:35:14 MST 2009
Sleeping 5 seconds

[2]+ Stopped ./myscript.sh 2
[aknosis@server ~]$</pre>
<pre>[aknosis@server ~]$ jobs
[1]- Stopped ./myscript.sh
[2]+ Stopped ./myscript.sh 2
[aknosis@server ~]$</pre>
Just issue the jobs command and it will let you know what the job id is and you can do as you please with it.

More info about <a href="http://www.linuxmanpages.com/man1/bash.1.php">bash</a> and its builtin programs/functions (fg/bg/disown/jobs)

Look out for more quick tips as I find out little things I always forget but always seem to need at some point in time.

-Ak
