---
layout: post
title: "Quick Tip: rawurlencode in Twig"
date: 2012-04-10 06:04
comments: true
categories: [php, Twig, Quick Tips]
---
I've been working on modifying listserv digest emails at work and porting them to Twig templates. The fun part was trying to create mailto: links that mimicked hitting reply (auto populating the subject with RE: [post title]). 

The problem with just jamming the title in to the ?subject= param is all sorts of fun like spacing and special characters. Turns out that you can use a Twig filter to urlencode a variable: [Twig - urlencode filter](http://twig.sensiolabs.org/doc/filters/url_encode.html)

Under the hood Twig's urlencode filter uses php's [urlencode](http://us.php.net/manual/en/function.urlencode.php). If you use the urlencode filter you may notice one slight issue, spaces are converted to + instead of %20. According php.net the solution here is to use rawurlencode instead of urlenccode. Well how do you go about calling the rawurlencode filter if it doesn't exist? 

RTFS! I couldn't seem to find out why rawurlencode wasn't an available filter and really didn't want to roll my own, it turns out if you [*read the source*](https://github.com/fabpot/Twig/blob/master/lib/Twig/Extension/Core.php#L475) you fill find an nice undocumented feature. Instead of creating a new filter for rawurlencode all you need to do is pass true to the urlencode filter! 

Example: 
{% gist 2347191 %}

Next step is to make a pull request and update the docs to be more verbose!

Enjoy.
