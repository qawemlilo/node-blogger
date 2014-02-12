var fs = require('fs'),
    ejs = require('ejs'),
    config = require('../config.json'),
    markdown = require('markdown').markdown,
    ejsTemplate = fs.readFileSync('./template/post.ejs', 'utf8'),
    sitemap = require('./sitemap');
    
    
function Compile () {
    "use strict";
    
    this.posts = require('../posts.json');
    this.current = 0;
    this.previous = false;
    
    return this;
}



Compile.prototype.init = function () {
    "use strict";
    
    var self = this;
    
    function createPost(post) {
        var MD = fs.readFileSync('./posts/' + post.filename + '.md', 'utf8'),
            html = self.toHtml(MD),
            data = self.compileTemplateData(post, html),
            template = self.compileTemplate(ejsTemplate, data);
        
        try {
            fs.writeFileSync('./posts/' + post.filename + '.html', template, 'utf8');
            
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
    "use strict";
    
    var next = this.current + 1,
        nextPost = this.posts[next]; 
    
    if (!nextPost) {
        return false;
    }
    
    return nextPost.url;
};


Compile.prototype.getPrevious = function () {
    "use strict";
    
    if (this.current === 0) {
        return false;
    }
    
    var prev = this.current - 1,
        prevPost = this.posts[prev]; 
    
    return prevPost.url;
};


Compile.prototype.toHtml = function (MD) {
    "use strict";
    
    try {
        var html = markdown.toHTML(MD);
    
        return html;
    }
    catch (error) {
        throw error;
    }    
};



Compile.prototype.compileTemplate = function (ejsTemplate, data) {
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



Compile.prototype.compileTemplateData = function (post, html) {
    "use strict";
    
    var getMonth = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    
    data = {
        blog: {
            baseUrl: config.blog.baseUrl,
            description: config.blog.description,
            url: config.blog.url,
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
            rss: config.author.rss,
            githubPage: config.author.githubPage,
            googlePage: config.author.googlePage,
            facbookPage: config.author.facbookPage,
            twitterHandle: config.author.twitterHandle,
            avatar: config.author.avatar
        },
        
        post: {
            title:  post.title,
            description:  post.description,
            year: post.year,
            month: getMonth[post.month],
            day: post.day,
            content: html,
            url: post.url,
            showDate: config.showDate,
            showPagination: config.showPagination,
            showShareButtons: config.showShareButtons
        },
        
        pagination: {
            next: this.getNext(),
            prev: this.getPrevious()
        }    
    };
    
    return data;
};

module.exports = Compile;