--- 
layout: post
title: Zero user interaction CAPTCHA - (lamecaptcha)
wordpress_id: 78
wordpress_url: http://www.aknosis.com/?p=78
date: 2009-04-17 21:42:54 -07:00
comments: true
---
This is not a new concept by far, however I want to share my fix for auto filling of forms on some of my sites. The issue arises from people creating bots/scripts that are intended to auto populate forms on site and submit them with the assumption that data does go somewhere and hopefully someone will click a bad link or buy some viagra or what not. This is most common when you have common web applications that have indentical registration forms or comment forms (like wordpress sites or forum software like phpbb). To solve this problem I'm sure you've see the wavy, crooked, colorful and always hard a hell to read text garbled that you have to enter before signing up to certain sites or buying tickets from ticket master. This form of "humanness test" if you will is refferred to as <a href="http://en.wikipedia.org/wiki/Captcha">CAPTCHA</a> (<strong>C</strong>ompletely <strong>A</strong>utomated <strong>P</strong>ublic <strong>T</strong>uring test to tell <strong>C</strong>omputers and <strong>H</strong>umans <strong>A</strong>part). The nice thing about implementing some form of captcha is that it will usually prevent most random attacks because most people don't spend time directly targeting a single site, what they do is try to make it work with the most sites as possible to spread the spam as much as possible.

The issue I have with most captcha systems is that they are a) annoying and b) they make me work harder than I need to be c) I end up having to squint my eyes and think hard to figure out what the f*ed up image is really saying. My ideal captcha would require 0 user interaction and somehow figureout that you are real.

So I decided to create my 'lamecaptcha'.

On most of my forms I have basic javascript validation that says If field a is empty than alert saying field a is empty please fill it in and return false so the form doesn't submit. However, all the bot has to do is fill in those required fields with garbage and then they put their html links/spam in my textbox or other field and submit away. But, I use this to my advantage. The bot says let me fill in all the text boxes available and hit submit.

So I decided to create a hidden textbox that a normal user can't see but a bot doesn't know is hidden.

{% codeblock lang:html %}
(hidden: <input type="text" value="" name="lamecaptcha" style="display:none;" /> )

(visible: <input type="text" value="" name="text" /> )
{% endcodeblock %}

(hidden: <input style="display:none;" name="lamecaptcha" type="text" /> )

(visible: <input name="text" type="text" /> )

Now when the form is submit all I have to do is make sure that the text box is empty and then I allow it to pass through:

{% codeblock lang:php %}
<?php
if(!empty($_POST['lamecaptcha'])){
       //Do something because no human should fill a hidden text box
       //If the box was visible for some reason, they still shouldn't fill
       //any text box with out a label saying what should be in it
}
{% endcodeblock %}

My "attacks" were few and far between but I have noticed that my database is no longer filled with garbage submissions and my clients are not complaining about getting spam from my server.
I haven't taken the time to figure it out but I would assume a lot of bots are also not running javascript, so another check might be to not allow form submission unless javascript is enabled (this can easily be defeated by a browser bot or there may be some way to fake out the check I don't know) but it may be worth while to enhance the effectiveness of this.

Again there are simple things like asking for 1+1 or type "here" in the box but I don't want to make my users do more work because of the a-holes out there, what we need to do is make it more difficult for them. People spend so much time sifting through the spam and garbage it is discusting. Please share with me any ways you have created zero interaction captcha, I think as a service provider bogging down the user is the wrong way to go, and I'm suprised to see CAPTCHA systems become more difficult for the user than the bot.

-Ak
