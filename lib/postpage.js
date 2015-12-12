"use strict";

var fs = require('fs');
var ejs = require('ejs');
var config = require('../config.json');
var markdown = require('markdown').markdown;
var ejsTemplate = fs.readFileSync('./template/post.ejs', 'utf8');
var sitemap = require('../sitemap');
    
    
function Compile (args) {
    this.posts = require('../posts.json');
    this.current = 0;
    this.previous = false;
    this.js = args.js;
    this.css = args.css;
    
    return this;
}



Compile.prototype.init = function () {
    var self = this;
    
    function createPost(post) {
        var MD = fs.readFileSync('./posts/md/' + post.filename + '.md', 'utf8');
        var html = self.toHtml(MD);
        var data = self.compileTemplateData(post, html);
        var template = self.compileTemplate(ejsTemplate, data);
        
        try {
            fs.writeFileSync('./posts/html/' + post.filename + '.html', template, 'utf8');
            
            sitemap.add({
                url: post.url,
                lastmod: Date.now()
            });
            
            console.log(post.filename + '.html' + ' created!');
            
        } catch (error) {
            throw error;
        }
        
        self.current += 1;
    }
    
    sitemap.add({
        url: config.blog.url,
        lastmod: Date.now()
    }); 

    self.posts.forEach(createPost);    
    sitemap.create(); 
};



Compile.prototype.getNext = function () {
    var next = this.current + 1;
    var nextPost = this.posts[next]; 
    
    if (!nextPost) {
        return false;
    }
    
    return nextPost.url;
};


Compile.prototype.getPrevious = function () {
    if (this.current === 0) {
        return false;
    }
    
    var prev = this.current - 1;
    var prevPost = this.posts[prev]; 
    
    return prevPost.url;
};


Compile.prototype.toHtml = function (MD) {
    try {
        var html = markdown.toHTML(MD);
    
        return html;
    }
    catch (error) {
        throw error;
    }    
};



Compile.prototype.compileTemplate = function (ejsTemplate, data) {
    var compiledHtml;
    
    try {
        compiledHtml = ejs.render(ejsTemplate, data);
    
        return compiledHtml;
    }
    catch (error) {
        throw error;
    }
};



Compile.prototype.compileTemplateData = function (post, html) {
    var getMonth = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    
    data = {
        blog: {
            baseUrl: config.blog.baseUrl,
            description: config.blog.description,
            url: config.blog.url,
            rss: config.blog.rss
        },
        
        author: {
            autobio: config.author.autobio,
            email: config.author.email,
            website: config.author.website,
            name: config.author.name,
            rss: config.author.rss,
            githubPage: config.author.githubPage,
            googlePage: config.author.googlePage,
            facbookPage: config.author.facbookPage,
            twitterHandle: config.author.twitterHandle,
            avatar: config.author.avatar
        },
        
        post: {
            id: post.id,
            title:  post.title,
            description:  post.description,
            year: post.year,
            month: getMonth[post.month],
            day: post.day,
            content: html,
            url: post.url,
            categories: post.categories
        },
        
        pagination: {
            next: this.getNext(),
            prev: this.getPrevious()
        },

        js: this.js,

        css: this.css     
    };
    
    return data;
};

module.exports = Compile;