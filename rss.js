
/*
  This file contains the program for creating an rss feed
*/


var Feed = require('rss'),
    fs = require('fs'),
    config = require('./config'),
    feed;



feed = new Feed({
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
    Fetches and reads ./posts.json (which contains all post entries)
    
    @returns: JSON Array
*/
RSS.prototype.getPosts = function () {
    var postsTxt, posts;
    
    postsTxt = fs.readFileSync('./posts.json', 'utf8');
    posts = JSON.parse(postsTxt);
    
    return posts;
};




/*
    Creates rss feed
*/
RSS.prototype.getFeed = function () {
    if (this.xml) {
        return this.xml;
    }
    
    var posts = this.getPosts(), xml, i;
    
    // latest posts first
    posts.reverse();

    for (i = 0; i < config.blog.rssLimit; i++) {
        feed.item({
            title: posts[i].title, 
            description: posts[i].title ,
            url: config.blog.url + posts[i].url, 
            guid: posts[i].id,
            author: posts[i].author,
            date: posts[i].date
        });    
    };
    
    this.xml = feed.xml();
    
    
    return this.xml;
};


module.exports = RSS;

