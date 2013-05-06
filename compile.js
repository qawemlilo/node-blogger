
var config = require('./config'),
    markdown = require('markdown').markdown,
    ejs = require('ejs'),
    fs = require('fs'),
    postsTxt,
    postsObject;

    
postsTxt = fs.readFileSync('./posts.json', 'utf8');
postsObject = JSON.parse(postsTxt);    



    
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
    @returns: (Object) Post
*/
function getPostObject (filename) {
    "use strict";
    
    var i;   

    for (i = 0; i < postsObject.length; i++) {
        if (postsObject[i].filename === filename) {
            return postsObject[i];
        }
    }
    
    return false;
}




/*
    This function generates the html of a single post
    
    @param: (String) filename - name of a post
    @returns: html
*/
function createPostHtml(filename) {
    "use strict";
    
    var index, postObject, html, postHtmlContent;
        
    index = fs.readFileSync('./template/post.ejs', 'utf8');
    postObject = getPostObject(filename);
    
    if (!postObject) {
       return false;
    }
    
    postHtmlContent = mdToHtml('./posts/' + filename + '.md');

    if (!postHtmlContent) {
        return false;
    }    
    
    html = ejs.render(index, {
        blog: {
            title: config.blog.name + ' - ' + postObject.title,
            baseUrl: config.blog.baseUrl,
            description: config.blog.description
        },
        author: {
            autobio: config.author.autobio,
            email: config.author.email,
            name: config.author.name,
            avatar: config.author.avatar
        },
        post: {
            title:  postObject.title,
            year: postObject.year,
            month: postObject.month,
            day: postObject.day,
            content: postHtmlContent
        }
    });
    
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
    
    postsObject.forEach(function (file) {
        var html = createPostHtml(file.filename);
        writeHtmlFile(file.filename, html);
    });
    
    console.log('Markdown to HTML conversion complete!');
}


/*
  Start compiling
*/
compile();

