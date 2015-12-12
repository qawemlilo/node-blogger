"use strict";

var fs = require('fs');
var path = require('path');
var config = require('../config.json');
    

/*
    Constructor function for creating a new post
    
    @param: (Object) opts - options for the new post
            (String) opts.title - title of new post
            (Date - millisecs) opts.date - publishing date
            (Array) opts.categories - categories for new post
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
    
    this.filename = this.createFilename(this.year, this.month, this.day, this.slug(this.title));
    
    this.url = this.createUrl(config.blog.baseUrl, this.year, this.month, this.day, this.slug(this.title));
 
 
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
            
        self.makeMDFile(config.blog.postsFolder + '/md/' + self.filename + '.md');
        self.savePosts(posts);
    }, 
    
    
    
    
    // creates post url
    createUrl: function (baseUrl, year, month, day, title) {
        baseUrl += year + '/';
        baseUrl += month + '/';
        baseUrl += day + '/';
        baseUrl += title;
    
        return baseUrl;
    },


    
    // creates a filename for the file that hold the post
    createFilename: function (year, month, day, title) {
        var fname = '';
    
        fname += year + '-';
        fname += month + '-';
        fname += day + '_';
        fname += title;
    
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
    makeMDFile: function (path) {
        var placeholder = "Ullamco proident labore aliquip et enim reprehenderit fugiat occaecat aliquip. Velit culpa tempor ex voluptate veniam nostrud et tempor sint sit deserunt ullamco. Duis nulla cupidatat consequat ullamco elit irure eiusmod consectetur sunt sint exercitation."; 
        
        try {
            fs.writeFileSync(path, placeholder);
            console.log(path + ' created');
        } catch (error) {
            throw error;
        }        
    },
    
    
    
    // saves new entry in posts.json
    savePosts: function (json) {
        var filename = path.join(__dirname, '../posts.json');
        var jsonString = JSON.stringify(json, null, 4);
        
        try {
            fs.writeFileSync(filename, jsonString);
        } catch (error) {
            throw error;
        }
    }
};



module.exports = Post;

