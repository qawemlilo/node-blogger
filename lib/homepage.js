"use strict";

var fs = require('fs');
var ejs = require('ejs');
var config = require('../config.json');
var ejsTemplate = fs.readFileSync('./template/index.ejs', 'utf8');
    
    
function Compile (args) {
    this.posts = require('../posts.json');
    this.js = args.js;
    this.css = args.css;
    
    return this;
}



Compile.prototype.init = function () {
    var html = this.toHtml();
    var data = this.compileTemplateData(html);
    var template = this.compileTemplate(ejsTemplate, data);
        
    try {
        fs.writeFileSync('./posts/html/index.html', template, 'utf8'); 
        console.log('index.html' + ' created! %s', '-_-'); 
    } catch (error) {
        throw error;
    }  
};



Compile.prototype.toHtml = function () {
    var links = '<dl class="dl-horizontal">';
    var posts;
    var getMonth = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // let's clone the posts array
    posts = this.posts.slice(0);
    
    // let's get new posts first
    posts.reverse();
    
    posts.forEach(function (post) {
        links += '<dt>' + (post.day > 9 ? post.day : '0' + post.day) + ' ' + getMonth[post.month] + ' ' + post.year + '</dt> ';
        links += '<dd><a href="' + post.url + '">' + post.title + '</a>' + '</dd>';         
    });
    
    links += '</dl>';

    return links;  
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



Compile.prototype.compileTemplateData = function (html) {
    var data = {
        blog: {
            title: config.blog.name,
            baseUrl: config.blog.baseUrl,
            description: config.blog.description,
            rss: config.blog.rss,
            isIndex: true
        },
        author: {
            autobio: config.author.autobio,
            email: config.author.email,
            website: config.author.website,
            name: config.author.name,
            githubPage: config.author.githubPage,
            googlePage: config.author.googlePage,
            facbookPage: config.author.facbookPage,
            twitterHandle: config.author.twitterHandle,
            avatar: config.author.avatar
        },
        post: {
            content: html
        },

        js: this.js,

        css: this.css 
    };
    
    return data;
};

module.exports = Compile;