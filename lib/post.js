
var fs = require('fs'),
    config = require('../config'),
    util = require('util'),
    EventEmitter = require('events').EventEmitter;


    

function Post(opts) {
    this.id = Date.now();
    
    // New post title
    this.title = opts.title;
    
    this.date = opts.date ? new Date(opts.date) : new Date();
    
    this.year = this.date.getFullYear();
    
    this.month = this.date.getMonth() + 1;
    
    this.day = this.date.getDay()+ 1;
    
    this.categories = opts.categories || ['uncategorised'];
    
    this.filename = this.createFilename();
    
    this.url = this.createUrl();
    
    // Create a new post
    this.createPost();
    
    return this;
}


/*
    Inherit from EventEmitter
*/
util.inherits(Post, EventEmitter);




Post.prototype.createPost = function () {
    var post = {
        id: this.id,
        title: this.title,
        date: this.date,
        year: this.year,
        month: this.month,
        day: this.day,
        filename: this.filename,
        url: this.url,
        categories: this.categories,
        author: config.author.name
    },
    
    self = this;
    
    self.getPosts(function (err, posts) {
        if (err) {
            self.emit('error', {msg: 'Failed to open posts.json' });
            throw error;
        }
        
        posts.push(post);
        
        self.savePosts(posts, function (error) {
            if (error) {
                self.emit('error', {msg: 'Failed to save to posts.json' });
                throw 'Error';
            }
            else {
                self.makeMDFile(function(error) {
                    if (error) {
                      self.emit('error', {msg: 'Failed to create MD file' });
                      throw 'Error';
                    }
                    else {
                        self.emit('complete');
                    }
                });
            }
        });
    }); 
};
    
    
    
    
Post.prototype.makeMDFile = function (fn) {
    var text = "# " + this.title, path = config.blog.markdownFolder + '/' + this.filename + '.md';
    
    fs.writeFile(path, text, function (error) {
        if (error) {
            fn(true);
        }
        else {
            fn(false);        
        }
    });    
};
    
    
    
    
Post.prototype.createUrl = function () {
    var url = config.blog.baseUrl + '/';
    
    url += this.year + '/';
    url += this.month + '/';
    url += this.day + '/';
    url += (this.title.replace(' ', '-')).toLowerCase();;
    
    return url;
};



Post.prototype.createFilename = function () {
    var fname = '';
    
    fname += this.year + '-';
    fname += this.month + '-';
    fname += this.day + '_';
    fname += (this.title.replace(' ', '-')).toLowerCase();
    
    return fname;
},
    
    
    
    
Post.prototype.getPosts = function (fn) {
    if (!fs.existsSync(config.blog.postsFile)) {
        fn(false, []); 
        console.log('posts.json does not exist');        
    }
    else {
        fs.readFile(config.blog.postsFile, function(error, contents) {
            if (!contents) {
                fn(false, []); 
                console.log('posts.json is empty');
            }
            else {
                var json = JSON.parse(contents);
                fn(error, json);
                console.log('posts.json found');
            }
        });
    }
};
    
    
    
    
Post.prototype.savePosts = function (json, fn) {
    var jsonString = JSON.stringify(json, null, 4);
        
    fs.writeFile(config.blog.postsFile, jsonString, function (error) {
        if (error) {
            fn(true);
        }
        else {
            fn(false);        
        }
    });
};


module.exports = Post;






