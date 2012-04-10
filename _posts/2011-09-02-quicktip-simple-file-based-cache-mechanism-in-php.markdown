--- 
layout: post
title: "Quicktip: Simple File Based Cache Mechanism in PHP"
wordpress_id: 528
wordpress_url: http://aknosis.com/?p=528
date: 2011-09-02 10:32:16 -07:00
---
Simple, yet effective enough, this is all the code I used to create caching for a feed retrieval to speed up subsequent requests. 

Enjoy!

[gist id=1189222]
< ? php
/**
 * @param string $uniqID - Anything that would be unique to what you are caching (url/database query) 
 * @param integer $expireSeconds - How old is too old that we refresh the cache
 */

function _getFromCache($uniqID, $expireSeconds) {
  $uniq = '/<path to your cache storage folder>/'.md5($uniqID);
  if (file_exists($uniq) && time() - filemtime($uniq) < = $expireSeconds) {
    return '<process cached file>($uniq)';
  }
  $somethingToCache = '<standard execution to get item>($uniqID)';
  file_put_contents($uniq, $somethingToCache); //You will want to implement __toString() if this is an object or maybe you can just serialize it
  return $somethingToCache;
}
[/gist]</standard>
