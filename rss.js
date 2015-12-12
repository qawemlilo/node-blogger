"use strict";

/*
  This file contains the program for creating an rss feed
*/


var Feed = require('rss');
var config = require('./config.json');

var feed = new Feed({
    title: config.blog.name,
    description: config.blog.description,
    feed_url: config.blog.url + config.blog.rss,
    site_url: config.blog.url,
    author: config.author.name
});



/*
    rss constructor function
*/
function RSS() {
    this.xml = false;
    
    return this; 
}


/*
    Creates rss feed
*/
RSS.prototype.getFeed = function () {
  if (this.xml) {
    return this.xml;
  }
  
  var posts = require('./posts.json');
  var xml;
  var i;
  var limit = config.blog.rssLimit > posts.length ? posts.length : config.blog.rssLimit;
  
  // latest posts first
  posts.reverse();

  for (i = 0; i < limit; i++) {
    feed.item({
      title: posts[i].title, 
      description: posts[i].description,
      url: config.blog.url + posts[i].url, 
      guid: posts[i].id,
      author: posts[i].author,
      date: posts[i].date
    });    
  }
  
  this.xml = feed.xml();
  
  return this.xml;
};


module.exports = RSS;

