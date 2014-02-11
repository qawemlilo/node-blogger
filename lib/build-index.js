var fs = require('fs'),
    ejs = require('ejs'),
    db = require('../config.json'),
    ejsTemplate = fs.readFileSync('./template/index.ejs', 'utf8'),
    allposts = require('../posts.json');
    
    
function Build () {
    "use strict";
    
    this.posts = allposts;
    
    return this;
}



Build.prototype.init = function () {
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



Build.prototype.toHtml = function () {
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



Build.prototype.compileTemplate = function (ejsTemplate, data) {
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



Build.prototype.compileTemplateData = function (html) {
    "use strict";
    
    var data = {
        blog: {
            title: db.getBlog('name'),
            baseUrl: db.getBlog('baseUrl'),
            description: db.getBlog('description'),
            rss: db.getBlog('rss'),
            showGithubButton: db.blogConfig('showGithubButton'),
            showFacebookButton: db.blogConfig('showFacebookButton'),
            showTwitterButton: db.blogConfig('showTwitterButton'),
            showGoogleButton: db.blogConfig('showGoogleButton'),
            showRssButton: db.blogConfig('showRssButton')
        },
        author: {
            autobio: db.get('author.autobio'),
            email: db.get('author.email'),
            website: db.get('author.website'),
            name: db.get('.authorname'),
            githubPage: db.get('author.githubPage'),
            googlePage: db.get('author.googlePage'),
            facbookPage: db.get('author.facbookPage'),
            twitterHandle: db.get('author.twitterHandle'),
            avatar: db.get('author.avatar')
        },
        post: {
            content: html
        }   
    };
    
    return data;
};

module.exports = Build;