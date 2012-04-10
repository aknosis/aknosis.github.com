--- 
layout: post
title: Fun with jQuery - Checkboxes!!!
wordpress_id: 215
wordpress_url: http://www.aknosis.com/?p=215
date: 2009-10-17 22:43:15 -07:00
---
Another day with jQuery, this time we are talking about checkboxes.

Just like I stated in my <a href="http://www.aknosis.com/2009/10/15/more-jquery-fun-auto-populating-a-select-box/">previous post</a> about select boxes, jQuery and checkbox <em>integration</em>, if you will, isn't cut and dry but damn near close. So how can jQuery assist with checkboxes? Lots of ways, here are a few examples to keep you entertained.

Try and manually select a checkbox and it will still toggle them correctly (turn them off it they are on and vice versa).

[inline]
[script type="text/javascript"]
function toggleChecks(){ $('input[type=checkbox]').each( function(){ if($(this).is(':checked')){ $(this).removeAttr('checked'); }else{ $(this).attr('checked',true); } }); }
[/script]
[/inline]
<table border="0">
<tbody>
<tr>
<td rowspan="2"><input class="button" onclick="toggleChecks();" type="button" value="Toggle Checks" /></td>
<td><input class="cb" type="checkbox" /></td>
<td><input class="cb" type="checkbox" /></td>
<td><input class="cb" type="checkbox" /></td>
<td><input class="cb" type="checkbox" /></td>
<td><input class="cb" type="checkbox" /></td>
<td><input class="cb" type="checkbox" /></td>
</tr>
<tr>
<td><input class="cb" type="checkbox" /></td>
<td><input class="cb" type="checkbox" /></td>
<td><input class="cb" type="checkbox" /></td>
<td><input class="cb" type="checkbox" /></td>
<td><input class="cb" type="checkbox" /></td>
<td><input class="cb" type="checkbox" /></td>
</tr>
</tbody></table>
<h3>jQuery selector for checkboxes</h3>
Just like any input you can choose your checkbox(es) with any standard selector.
<ul>
	<li><strong>By Class</strong>
[js]
//Selector
$('.cb_class')
[/js]
[html]
&lt;!-- Input Html --&gt;
&lt;input type=&quot;checkbox&quot; class=&quot;cb_class&quot; /&gt;
[/html]
</li>
	<li><strong>By Id</strong>
[js]
//Selector
$('#cb')
[/js]
[html]
&lt;!-- Input Html --&gt;
&lt;input type=&quot;checkbox&quot; id=&quot;cb&quot; /&gt;
[/html]
</li>
<li><strong>By tag and attribute</strong>
[js]
//Selector
 $('input[type=checkbox]')
//Note: This would select all checkboxes
//(same code in the Toggle Checks button above)
[/js]
[html]
&lt;!-- Input Html --&gt;
&lt;input type=&quot;checkbox&quot; /&gt;
[/html]
</li>
<li><strong>By tag and attribute</strong>
[js]
//Selector
$('input[name=checkBoxname]')
[/js]
[html]
&lt;!-- Input Html --&gt;
&lt;input type=&quot;checkbox&quot; name=&quot;checkBoxname&quot; /&gt;
[/html]
</li>
</ul>
<!--more-->
<h3>How to tell if a check box is checked?</h3>
<input id="cb1" class="cb" type="checkbox" />
<input class="button" onclick="if($('#cb1').is(':checked')){alert('It is checked');}else{alert('Not checked');}" type="button" value="Is this checkbox checked?" />

[js]
if($('#cb1').is(':checked')){ //Check if checkbox is checked and alert the result
alert('It is checked');
}else{
alert('Not checked');
}
[/js]
<h3>How to check and uncheck a checkbox</h3>
<p>
There is no magical built-in function to check and uncheck but use of standard jQuery functions will accomplishes the same task.
</p>
<input id="cb2" class="cb" type="checkbox" />
<input class="button" onclick="$('#cb2').attr('checked',true);" type="button" value="Check Checkbox" />
<input class="button" onclick="$('#cb2').attr('checked',false);" type="button" value="Uncheck Checkbox" />
[js]
//Check Code
//This just adds the checked attribute to the input tag
$('#cb2').attr('checked',true);
//Uncheck Code
//This just removes the checked attribute from the input tag
$('#cb2').attr('checked',false);
//Can also use this:
$('#cb2').removeAttr('checked');
[/js]
<h3>Determine the value of checked boxes</h3>
<p>
If you have a value assigned to your checked boxes all you need to do is use the .val() function to return the value.
</p>
<input id="cb3" class="cb" type="checkbox"  value="Checkbox 3" />
<input class="button" onclick="alert('Value: '+$('#cb3').val());" type="button" value="What is the value?" />
[html]
&lt;input id=&quot;cb3&quot; type=&quot;checkbox&quot; value=&quot;Checkbox 3&quot; /&gt;
[/html]
[js]
alert('Value: '+$('#cb3').val());
[/js]

<h3> Full Example </h3>
<p>
This function will get all the values of the checked checkboxes, add the results and display them.
</p>
[inline]
[script type="text/javascript"]
function calcChecked(){
var total = 0;
var str = '0';
 $('#table :checked').each(
function(){
  var val = parseInt($(this).val());
 total += val;
str += ' + '+val;
$(this).removeAttr('checked');
}
);
str += ' = '+total
$('#updater').append('<div style="display:none">'+str+'</div>');
$('#updater div:last').slideDown('slow');
}
[/script]
[/inline]
[js]
function calcChecked(){
var total = 0;
var str = '0';
 $('#table :checked').each( 
//Execute this function for each ':checked' element in the table
function(){
  var val = parseInt($(this).val()); //Get integer value
 total += val; //Add to the total
str += ' + '+val; //Add to the equation string
$(this).removeAttr('checked'); //Uncheck the checkbox
}
);
str += ' = '+total //Finalize the equation
$('#updater').append('&lt;div style=&quot;display:none&quot;&gt;'+str+'&lt;/div&gt;'); //Add the string to the table
$('#updater div:last').slideDown('slow'); //Use some flare to make it show up
}
[/js]
<table border="0" id="table">
<tbody>
<tr>
<td rowspan="2">
<input class="button" onclick="calcChecked();" type="button" value="Calculate Checked" />
<div id="updater">

</div>
</td>
<td><input class="cb" type="checkbox" value="1" />1</td>
<td><input class="cb" type="checkbox" value="2" />2</td>
<td><input class="cb" type="checkbox" value="3" />3</td>
<td><input class="cb" type="checkbox" value="4" />4</td>
<td><input class="cb" type="checkbox" value="5" />5</td>
<td><input class="cb" type="checkbox" value="6" />6</td>
</tr>
<tr>
<td><input class="cb" type="checkbox" value="7" />7</td>
<td><input class="cb" type="checkbox" value="8" />8</td>
<td><input class="cb" type="checkbox" value="9" />9</td>
<td><input class="cb" type="checkbox" value="10" />10</td>
<td><input class="cb" type="checkbox" value="11" />11</td>
<td><input class="cb" type="checkbox" value="12" />12</td>
</tr>
</tbody></table>
Need help with something else? Just ask, post a comment and I'll help you out.
