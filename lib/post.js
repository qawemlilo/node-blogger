
"use strict";

var fs = require('fs'),
    path = require('path'),
    config = require('../config.json');
    

/*
    Constructor function for creating a new post
    
    @param: (Object) opts - options for the new post
    @param: (String) opts.title - title of new post
    @param: (Date - millisecs) opts.date - publishing date
    @param: (Array) opts.categories - categories for new post
*/
function Post(opts) {
    this.id = Date.now();
    
    this.title = opts.title;

    this.description = opts.description;    
    
    this.date = opts.date ? new Date(opts.date) : new Date();
    
    this.year = this.date.getFullYear();
    
    this.month = this.date.getMonth() + 1;
    
    this.day = this.date.getDate();
    
    this.categories = opts.categories || ['uncategorised'];
    
    this.filename = this.createFilename();
    
    this.url = this.createUrl();
 
 
    return this;
}




Post.prototype = {

    // Method for creating a new post
    // Creates a new markdown file
    createPost: function () {
        var self = this, posts,
        
        post = {
            id: self.id,
            title: self.title,
            description: self.description,
            date: self.date,
            year: self.year,
            month: self.month,
            day: self.day,
            filename: self.filename,
            url: self.url,
            categories: self.categories,
            author: config.author.name
        };
    
        posts = self.getPosts();
        posts.push(post);
            
        self.makeMDFile();
        self.savePosts(posts);
    }, 
    
    
    
    
    // creates post url
    createUrl: function () {
        var url = config.blog.baseUrl;
        
        url += this.year + '/';
        url += this.month + '/';
        url += this.day + '/';
        url += this.slug(this.title);
    
        return url;
    },


    
    // creates a filename for the file that hold the post
    createFilename: function () {
        "use strict";
        
        var fname = '';
    
        fname += this.year + '-';
        fname += this.month + '-';
        fname += this.day + '_';
        fname += this.slug(this.title);
    
        return fname;
    },
    
    
    

    slug: function (title) {
        var slug = title.replace(/[\.,\/#!$%\^&\*;:{}<>=\-_`~()]/g, '');
        
        slug = slug.replace(/ /g, '-');
        slug = slug.toLowerCase();
        
        return slug;
    },
    
    
    
    // gets all posts
    getPosts: function () {
        var posts = [];
        
        if (fs.existsSync(config.blog.postsFile)) {
            posts = require('../posts.json');       
        }
        
        return posts;
    },
    
    
    
    
    // creates markdown file
    makeMDFile: function () {
        var placeholder = "Ullamco proident labore aliquip et enim reprehenderit fugiat occaecat aliquip. Velit culpa tempor ex voluptate veniam nostrud et tempor sint sit deserunt ullamco. Duis nulla cupidatat consequat ullamco elit irure eiusmod consectetur sunt sint exercitation.",
        url = path.resolve(__dirname, '../posts', this.filename + '.md'); 
        
        try {
            fs.writeFileSync(url, placeholder);
            console.log();
            console.log(url + ' created');
        } catch (error) {
            throw error;
        }        
    },
    
    
    
    // saves new entry in posts.json
    savePosts: function (json) {
        var filename = path.resolve(__dirname, '../posts.json'), 
            jsonString = JSON.stringify(json, null, 4);
        
        try {
            fs.writeFileSync(filename, jsonString);
        } catch (error) {
            throw error;
        }
    }
};



module.exports = Post;

