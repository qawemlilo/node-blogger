var fs = require('fs'),
    ejs = require('ejs'),
    config = require('../config.json'),
    templateConfig = require('../template/template.json'),
    path = require('path'),
    indexTemplate = path.resolve(__dirname, '../template', 'index.ejs'),
    ejsTemplate = fs.readFileSync(indexTemplate, 'utf8');
    
    
function Compile () {
    "use strict";
    
    this.posts = require('../posts.json');
    
    return this;
}



Compile.prototype.init = function () {
    "use strict";
    
    var html = this.toHtml(),
        data = this.compileTemplateData(html),
        template = this.compileTemplate(ejsTemplate, data),
        indexfiles = path.resolve(__dirname, '../www', 'index.html');
        
    try {
        fs.writeFileSync(indexfiles, template, 'utf8'); 
        console.log('index.html created!'); 
    } catch (error) {
        throw error;
    }  
};



Compile.prototype.toHtml = function () {
    "use strict";
    
    var links = '<ul class="allposts">', posts, 
        getMonth = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // let's clone the posts array
    posts = this.posts.slice(0);
    
    // let's get new posts first
    // posts.reverse();
    
    posts.sort(function (obj1, obj2) {
        return obj2.id - obj1.id;
    });
    
    posts.forEach(function (post) {
        links += '<li>' + (post.day > 9 ? post.day : '0' + post.day) + ' ' + getMonth[post.month] + ' ' + post.year + ' ';
        links += '<a href="' + post.url + '">' + post.title + '</a>' + '</li>';         
    });
    
    links += '</ul>';

    return links;  
};



Compile.prototype.headData = function () {
    "use strict";
    
    var assets = path.resolve(__dirname, '../template'),
        cssFiles = templateConfig.css,
        jsFiles = templateConfig.js,
        css = '', js = '';
    
    cssFiles.forEach(function (url) {
        var data = fs.readFileSync(path.resolve(__dirname, '../template', url), 'utf8');
        
        css += data;         
    });
    
    jsFiles.forEach(function (url) {
        var data = fs.readFileSync(path.resolve(__dirname, '../template', url), 'utf8');
        
        js += data;          
    });
    
    links += '</ul>';

    return links;  
};




Compile.prototype.compileTemplate = function (ejsTemplate, data) {
    "use strict";
    
    var compiledHtml;
    
    // hack to allow template to compile
    data.filename = indexTemplate;
    
    try {
        compiledHtml = ejs.render(ejsTemplate, data);
    
        return compiledHtml;
    }
    catch (error) {
        throw error;
    }
};



Compile.prototype.compileTemplateData = function (html) {
    "use strict";
    
    var data = {
        blog: {
            title: config.blog.name,
            baseUrl: config.blog.baseUrl,
            description: config.blog.description,
            rss: config.blog.rss,
            showGithubButton: config.showGithubButton,
            showFacebookButton: config.showFacebookButton,
            showTwitterButton: config.showTwitterButton,
            showGoogleButton: config.showGoogleButton,
            showRssButton: config.showRssButton
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
        }   
    };
    
    return data;
};

module.exports = Compile;