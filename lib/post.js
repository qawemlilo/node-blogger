
var fs = require('fs'),
    config = require('../config');
    

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




Post.prototype = {
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
    
        self.getPosts(function (err, posts) {
            if (err) {
               console.log('Failed to open posts.json');
                throw error;
            }
        
            posts.push(post);
        
            self.savePosts(posts, function (error) {
                if (error) {
                    console.log('Failed to save to posts.json');
                    throw 'Error';
                }
                else {
                    self.makeMDFile(function(error) {
                        if (error) {
                            console.log('Failed to create MD file');
                            throw 'Error';
                        }
                        else {
                            console.log('complete');
                        }
                    });
                }
            });
        });
    }, 
    
    
    
    
    makeMDFile: function (fn) {
        var text = "Ullamco proident labore aliquip et enim reprehenderit fugiat occaecat aliquip. Velit culpa tempor ex voluptate veniam nostrud et tempor sint sit deserunt ullamco. Duis nulla cupidatat consequat ullamco elit irure eiusmod consectetur sunt sint exercitation. Commodo cupidatat occaecat quis cillum velit nostrud nisi occaecat ad ullamco laboris consectetur pariatur. Eiusmod excepteur in sunt proident aliqua labore reprehenderit anim magna duis laboris. Sunt irure nulla do ullamco ex do exercitation nostrud. Labore ipsum voluptate ea sint Lorem quis nisi deserunt deserunt.", 
        
        path = config.blog.postsFolder + '/' + this.filename + '.md';
    
        fs.writeFile(path, text, function (error) {
            if (error) {
                fn(true);
            }
            else {
                fn(false);        
            }
        });    
    },
    
    
    
    
    createUrl: function () {
        var url = config.blog.baseUrl;
    
        url += this.year + '/';
        url += this.month + '/';
        url += this.day + '/';
        url += (this.title.replace(' ', '-')).toLowerCase();;
    
        return url;
    },



    createFilename: function () {
        var fname = '';
    
        fname += this.year + '-';
        fname += this.month + '-';
        fname += this.day + '_';
        fname += (this.title.replace(' ', '-')).toLowerCase();
    
        return fname;
    },
    
    
    
    
    getPosts: function (fn) {
        if (!fs.existsSync(config.blog.postsFile)) {
            fn(false, []);        
        }
        else {
            fs.readFile(config.blog.postsFile, function(error, contents) {
                if (!contents) {
                    fn(false, []); 
                }
                else {
                    var json = JSON.parse(contents);
                    fn(error, json);
                }
            });
        }
    },
    
    
    
    
    savePosts: function (json, fn) {
        var jsonString = JSON.stringify(json, null, 4);
        
        fs.writeFile(config.blog.postsFile, jsonString, function (error) {
            if (error) {
                fn(true);
            }
            else {
                fn(false);        
            }
        });
    }
}


module.exports = Post;






