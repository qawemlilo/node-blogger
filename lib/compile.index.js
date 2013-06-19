var fs = require('fs'),
    ejs = require('ejs'),
    config = require('../config.json'),
    ejsTemplate = fs.readFileSync('./template/index.ejs', 'utf8');
    
    
function Index () {
    "use strict";
    
    this.posts = require('../posts.json');
    
    this.init();
}



Index.prototype.init = function () {
    "use strict";
    
    var html = this.toHtml(),
        data = this.compileTemplateData(html),
        template = this.compileTemplate(ejsTemplate, data);
        
    try {
        fs.writeFileSync('./posts/index.html', template, 'utf8'); 
        console.log('index.html' + ' created! %s', '-_-'); 
    } catch (error) {
        throw error;
    }  
};



Index.prototype.toHtml = function () {
    "use strict";
    
    var links = '<ul class="allposts">', posts, 
        getMonth = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // let's clone the posts array
    posts = this.posts.slice(0);
    
    // let's get new posts first
    posts.reverse();
    
    posts.forEach(function (post) {
        links += '<li>' + (post.day > 9 ? post.day : '0' + post.day) + ' ' + getMonth[post.month] + ' ' + post.year + ' ';
        links += '<a href="' + post.url + '">' + post.title + '</a>' + '</li>';         
    });
    
    links += '</ul>';

    return links;  
};



Index.prototype.compileTemplate = function (ejsTemplate, data) {
    "use strict";
    
    var compiledHtml;
    
    try {
        compiledHtml = ejs.render(ejsTemplate, data);
    
        return compiledHtml;
    }
    catch (error) {
        throw error;
    }
};



Index.prototype.compileTemplateData = function (html) {
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

module.exports = Index;