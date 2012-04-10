--- 
layout: post
title: jQuery Pluginifier - Plugin Instantiator & Plugin Boilerplate
excerpt: After coming across a recent blog post on jQuery Plugin Boilerplate code it reminded me a few months back when I was looking at the best method for authoring plugins for use at work. After much googling and trial and error I finally came to grips with something and below is the end result.
wordpress_id: 398
wordpress_url: http://aknosis.com/?p=398
comments: true
date: 2011-05-11 06:01:58 -07:00
---
After coming across a recent blog post on <a href="http://stefangabos.ro/jquery/jquery-plugin-boilerplate/">jQuery Plugin Boilerplate</a> code it reminded me a few months back when I was looking at the best method for authoring plugins for use at work. After much googling and trial and error I finally came to grips with something and below is the end result.

The code in the <a href="http://stefangabos.ro/jquery/jquery-plugin-boilerplate/">jQuery Plugin Boilerplate</a> blog post is very similar to the <a href="http://docs.jquery.com/Plugins/Authoring">plugin authoring page</a> in the jQuery Documentation. While they are both good resources, I think they favor single plugins and may potentially lead developers down a path of duplicate code. Similar to jQuery UI's $.widget what I want to push here is a snippet of code that can transform your code into a "jQuery Plugin" (is there a real definition of this somewhere?).

<!--more-->

<span style="font-size: 20px; font-weight: bold;">The Meat - Pluginifier (Instantiator)</span>

The plugin instantiator function creates the prototype plugin function using jQuery.fn, inside that function the code will handle creating/storing/retrieving plugin instances and calling methods on plugins that are already created. This code is meant for reuse for n amount of plugins you create, there is no need to rewrite this block of code (or something similar) for each plugin you have.

{% codeblock lang:javascript %}
//Wrap in a closure to secure $ for jQuery
(function( $ ) {

	//name is the name of your plugin
	$.pluginifier = function( name ) {

		//Create the prototype function for the plugin
		$.fn[name] = function( options ) {

			//args isset to everything passed in after options item
			var args = Array.prototype.slice.call( arguments , 1 );

			//Don't waste time if there are no matching elements
			if( this.length ) {

				//Support chaining by returning this
				return this.each( function() {

					/*
					 * Retrieve the instance from $.data() OR create the instance, _init() it, and store that instance in $.data()
					 * Here your plugin is assumed to live in namespace.plugins.name
					 * Look in the samples folder for a namespaced example
					 */
					var instance = $.data( this , name ) || $.data( this , name , new namespace.plugins[name]( this , options )._init() );

					//If the first arg is a string we assume you are calling a method inside the plugin instance
					if( typeof options === "string" ){

						//underscored methods are "private" (similar to jQuery UI's $.widget we allow this to make methods not availble via public api)
						options = options.replace( /^_/ , "" );

						//Check if underscore filtered method exists
						if( instance[options] ) {

							//Call method with args
							instance[options].apply( instance , args );
						}
					}
				});
			}
		};
	};
})( jQuery );

//After pluginifier and your plugin are in place you need to register your plugins
//$.pluginifier( "myAwesomeSauce" );

{% endcodeblock %}

<h2>The Cheese - Plugin Boilerplate</h2>
The idea of this plugin boilerplate is that you keep the code that does everything separate from the code that makes it accessible as a jQuery Plugin.

{% codeblock lang:javascript %}
//This should be available somewhere, doesn't have to be here explicitly
var namespace = {

	//This will hold all of the plugins
	plugins : {}
};

//Wrap in a closure to secure $ for jQuery
(function( $ ){

	//Constructor - This is what is called when we create call new namspace.plugins.pluginNameHere( this , options );
	namespace.plugins.pluginNameHere = function( ele , options ){
		this.$this = $( ele );
		this.options = $.extend( {} , this.defaults , options );
	};

	//These prototype items get assigned to every instance of namespace.plugins.pluginNameHere
	namespace.plugins.pluginNameHere.prototype = {

		//This is the default option all instances get, can be overridden by incoming options argument
		defaults : {
			opt: "tion"
		},

		//private init method - This is called immediately after the constructor
		_init : function(){
			//useful code here
		},

		//private method - We filter out method names that start with an underscore this won't work outside
		_aPrivateMethod : function(){
			//Something useful here that is not needed externally
		},

		//public method - This method is available via $("#element").pluginNameHere("aPublicMethod","aParameter");
		aPublicMethod : function(){
			//Something useful here that anyone can call anytime
		}
	};

	//Here we register the plugin - $("#ele").pluginNameHere(); now works as expected
	$.pluginifier( "pluginNameHere" );

})( jQuery );
{% endcodeblock %}

<h2>The pickles?</h2>
These two jsFiddles are examples of the same plugin written with and without the pluginifier and my boilerplate. You'll see that the functionality stays the same and the concept to grasp here is on code reuse and management. - Also note there is overhead in filesize when you are dealing with a single plugin, however once you add another plugin that utilizes $.pluginifier you gain a few bytes.


{% jsfiddle 5UZuv %}

{% jsfiddle 43Whr %}

All of this code is available on github: <a href="https://github.com/aknosis/jquery-pluginifier">https://github.com/aknosis/jquery-pluginifier/</a>.

I'm interested to see how people may use this code or what else they use instead. Questions and comments are always welcomed. Alex Sexton deserves most of the credit for this cod (see below).

<span style="font-size: 15px; font-weight: bold;">Resources:</span>
<ul>
	<li><a href="http://alexsexton.com/?p=51" target="_blank">Using Inheritance Patterns to Organize Large jQuery Applications</a> - If you want a greater understanding of this concept take a look at Alex Sexton's post, you will see where I came up with most of this code (although there are some tweaks that I made for personal preference), read the comments too as there is some good discussion.</li>
	<li><a href="http://stefangabos.ro/jquery/jquery-plugin-boilerplate/">jQuery Plugin Boilerplate</a> - Stefan Gabos</li>
	<li><a href="http://docs.jquery.com/Plugins/Authoring" target="_blank">jQuery Documentation on Plugin Authoring </a></li>
</ul>
