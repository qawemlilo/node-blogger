
var rss = require('rss'),
    fs = require('fs'),
    config = require('./config'),
    feed;



feed = new rss({
    title: config.blog.name,
    description: config.blog.description,
    feed_url: 'http://localhost:3080/rss',
    site_url: 'http://localhost:3080',
    author: config.author.name
});




function RSS() {
    this.createFeed();
    this.xml = feed.xml();
    
    return this; 
}




RSS.prototype.getPosts = function () {
    var postsTxt, posts;
    
    postsTxt = fs.readFileSync('./posts.json', 'utf8');
    posts = JSON.parse(postsTxt);
    
    return posts;
};



RSS.prototype.createFeed = function () {
    var posts = this.getPosts();
    
    posts.forEach(function (post) {
        feed.item({
            title: post.title, 
            description: post.title ,
            url: 'http://localhost:3080' + post.url, 
            guid: post.id,
            author: post.author,
            date: post.date
        });    
    });
};


module.exports = RSS;
