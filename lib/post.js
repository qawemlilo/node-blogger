
var fs = require('fs'),
    config = require('../config.json');
    

function Post(opts) {
    this.id = Date.now();
    
    // New post title
    this.title = opts.title;
    
    this.date = opts.date ? new Date(opts.date) : new Date();
    
    this.year = this.date.getFullYear();
    
    this.month = this.date.getMonth() + 1;
    
    this.day = this.date.getDate();
    
    this.categories = opts.categories || ['uncategorised'];
    
    this.filename = this.createFilename();
    
    this.url = this.createUrl();
    
    // Create a new post
    this.createPost();
    
    return this;
}




Post.prototype = {

    // Method for creating a new post
    // Creates a new markdown file
    createPost: function () {
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
    
        self.getPosts(function (posts) {
        
            posts.push(post);
            
            self.makeMDFile(function(error) {
                if (error) {
                    console.log('Failed to create MD file');
                }
                else {
                    self.savePosts(posts, function (error) {
                        if (error) {
                            console.log('Failed to save to posts.json');
                        }
                        else {
                            console.log(self.filename + '.md created');
                        }
                    });
                }
            });
        });
    }, 
    
    
    
    // creates markdown file
    makeMDFile: function (fn) {
        var text = "Ullamco proident labore aliquip et enim reprehenderit fugiat occaecat aliquip. Velit culpa tempor ex voluptate veniam nostrud et tempor sint sit deserunt ullamco. Duis nulla cupidatat consequat ullamco elit irure eiusmod consectetur sunt sint exercitation.", 
        
        path = config.blog.postsFolder + '/' + this.filename + '.md';
    
        fs.writeFile(path, text, function (error) {
            fn(error);        
        });    
    },
    
    
    
    
    // creates post url
    createUrl: function () {
        var url = config.blog.baseUrl,
            title = this.title.replace(/[\.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');;
    
        url += this.year + '/';
        url += this.month + '/';
        url += this.day + '/';
        url += (title.replace(/ /g, '-')).toLowerCase();
    
        return url;
    },


    
    // creates a filename for the file that hold the post
    createFilename: function () {
        var fname = '', 
            title = this.title.replace(/[\.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
    
        fname += this.year + '-';
        fname += this.month + '-';
        fname += this.day + '_';
        
        fname += (title.replace(/ /g, '-')).toLowerCase();
    
        return fname;
    },
    
    
    
    // gets all posts
    getPosts: function (fn) {
        if (!fs.existsSync(config.blog.postsFile)) {
            fn([]);        
        }
        else {
            var posts = require('../posts.json');
            fn(posts);
        }
    },
    
    
    
    // saves new entry in posts.json
    savePosts: function (json, fn) {
        var jsonString = JSON.stringify(json, null, 4);
        
        fs.writeFile(config.blog.postsFile, jsonString, function (error) {
             fn(error);
        });
    }
}




module.exports = Post;

