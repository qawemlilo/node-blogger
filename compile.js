
var config = require('./config'),
    markdown = require('markdown').markdown,
    ejs = require('ejs'),
    fs = require('fs'),
    postsArray = getPostsArray(),
    getMonth = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];   




/*
   This function reads ./posts.json (which contains all posts entries) and returns the contents in JSON format
   
   @returns: JSON
*/
function getPostsArray() {
    var postsTxt, posts;
    
    postsTxt = fs.readFileSync('./posts.json', 'utf8');
    posts = JSON.parse(postsTxt);
    
    return posts;
}   



    
/*
    This function converts the contents of a Markdown file to html
    
    @param: (String) filename - name of a markdown file
    @returns: html
*/
function mdToHtml (filename) {
    "use strict";
    
    var contents = fs.readFileSync(filename, 'utf8'),
        html = markdown.toHTML(contents);
    
    return html; 
}




/*
    This function reads the posts.json file and returns the object of a single post
    
    @param: (String) filename - name of a post
    @returns: (Object) Post or (Boolean) false
*/
function getPostObject (filename) {
    "use strict";
    
    var i;   

    for (i = 0; i < postsArray.length; i++) {
        if (postsArray[i].filename === filename) {
            return postsArray[i];
        }
    }
    
    return false;
}




/*
    This function reads the posts.json file and returns the object of a single post
    
    @param: (String) filename - name of a post
    @returns: (Object) Post or (Boolean) false
*/
function compileTemplate(template, data) {
    "use strict";
    var ejsTemplate, compiledHtml;
    
    ejsTemplate = fs.readFileSync('./template/' + template, 'utf8');
    compiledHtml = ejs.render(ejsTemplate, data);
    
    return compiledHtml;
}





/*
    This function generates the html of a single post
    
    @param: (String) filename - name of a post
    @returns: html
*/
function createPost(filename) {
    "use strict";
    
    var postObject, postHtmlContent, data, html;
    
    postObject = getPostObject(filename);
    
    if (!postObject) {
       return false;
    }
    
    postHtmlContent = mdToHtml('./posts/' + filename + '.md');

    if (!postHtmlContent) {
        return false;
    }    
    
    data = {
        blog: {
            title: config.blog.name + ' - ' + postObject.title,
            baseUrl: config.blog.baseUrl,
            description: config.blog.description
        },
        author: {
            autobio: config.author.autobio,
            email: config.author.email,
            website: config.author.website,
            name: config.author.name,
            rss: config.author.rss,
            googlePage: config.author.googlePage,
            facbookPage: config.author.facbookPage,
            twitterHandle: config.author.twitterHandle,
            avatar: config.author.avatar
        },
        post: {
            title:  postObject.title,
            year: postObject.year,
            month: getMonth[postObject.month],
            day: postObject.day,
            content: postHtmlContent
        }
    };
    
    html = compileTemplate('post.ejs', data);
    
    return html;  
}




/*
    This function generates links for all post to be displayed on the home page
    
    @returns: <ul> html
*/
function createLinks() {
    var links = '<ul class="allposts">', 
        posts;
    
    //clone posts object
    posts = postsArray.slice(0);
    posts.reverse();
    
    posts.forEach(function (post) {
        links += '<li>' + post.day + ' ' + getMonth[post.month] + ' ' + post.year + ' ';
        links += '<a href="' + post.url + '">' + post.title + '</a>' + '</li>';         
    });
    
    links += '</ul>';

    return links;
};




/*
    This function generates the html for the home page

    @returns: html
*/
function createIndex() {
    "use strict";
    
    var html, homeContent, data;
    
    homeContent = createLinks();

    if (!homeContent) {
        return false;
    }    
    
    data = {
        blog: {
            title: config.blog.name,
            baseUrl: config.blog.baseUrl,
            description: config.blog.description
        },
        author: {
            autobio: config.author.autobio,
            email: config.author.email,
            website: config.author.website,
            name: config.author.name,
            rss: config.author.rss,
            googlePage: config.author.googlePage,
            facbookPage: config.author.facbookPage,
            twitterHandle: config.author.twitterHandle,
            avatar: config.author.avatar
        },
        post: {
            content: homeContent
        }
    };
    
    html = compileTemplate('index.ejs', data);
    
    return html;  
}




/*
    This function first checks if the html file exists, then checks if the md file has been modifed, then to disk.
    
    @param: (String) filename - name html file to be created
*/
function writeHtmlFile(filename, html) {
    "use strict";
    
    if (fs.existsSync('./posts/' + filename + '.html')) {
        var htmlStats = fs.statSync('./posts/' + filename + '.html'),
            mdStats = fs.statSync('./posts/' + filename + '.md');
             
        if (mdStats.mtime.getTime() < htmlStats.ctime.getTime()) {
            return;
        } 
    }
    
    fs.writeFileSync('./posts/' + filename + '.html', html, 'utf8');
}




function compile() {
    "use strict";

    fs.writeFileSync('./posts/index.html', createIndex(), 'utf8');
    console.log('Home page created!');
    
    postsArray.forEach(function (file) {
        var html = createPost(file.filename);
        writeHtmlFile(file.filename, html);
        
        console.log(file.title + ' post created!');
    });
}


/*
  Start compiling
*/
compile();

