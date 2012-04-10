--- 
layout: post
title: "Php: (strpos) Search for text in a string"
wordpress_id: 63
wordpress_url: http://www.aknosis.com/?p=63
date: 2009-02-28 02:08:20 -07:00
---
If you want to search for text inside a string but don't need fancyness of regex, here lies strpos.

I see a lot of posts online about people confused how strpos works and how to use it for searching for text in a string properly. First thing to note is that strpos() returns the index of the location of the string (not true if the string exists in part of the testing string).  So:

[php highlight="3"]
$string = 'thedog';
var_dump(strpos($string,'dog'));
Output: int(3)
[/php]

How does this benefit you if you want to make sure that $string doesn't contain dog:

[php highlight="3"]
$string = 'thecat';
var_dump(strpos($string,'dog'));
Output: bool(false)
[/php]

As you can see the result was false, but sticking that strpos straight inside your if statement is bad and erroneous code... Here's why:
[php highlight="7"]
$string = 'thecat';
if(strpos($string,'the')){
    echo 'The is in the string';
}else{
    echo 'The is not in the string';
}
Output: The is not in the string
[/php]
What?? Lets take a closer look:
[php highlight="3"]
$string = 'thecat';
var_dump(strpos($string,'the'));
Output: int(0)
[/php]
So you see, the reason the if statement failed is because the if statement fails on a value of 0.

The proper way to test with strpos is as follows:
[php highlight="5"]
$string = 'themonkey';
if(strpos($string,'monkey') !== false){
    echo 'There is a monkey in my string';
}
Output: There is a monkey in my string
[/php]
strpos() will return false if monkey is not in $string so the sure fire way to test to make sure it isn't in there is to say that the return value is explictly not false.<em> !== confuse you? This tests for an actual boolean value of false. Other values make cause an if statement to fail (such as 0 mentioned above)</em>

(Read more about type comparison here. <a href="http://us2.php.net/manual/en/types.comparisons.php" target="_blank">http://us2.php.net/manual/en/types.comparisons.php</a>)

If data types are making you say huh?? See here:  <a href="http://us3.php.net/manual/en/language.types.php" target="_blank">http://us3.php.net/manual/en/language.types.php</a>, I will post later briefly about php and data types,  if you have used Java than you live and die by data types,  but php has a very simple concept when it comes to data types which makes coding in general easy but relying on and full understanding your own code sometimes difficult.

-Ak
