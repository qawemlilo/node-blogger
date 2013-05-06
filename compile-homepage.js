
var config = require('./config'),
    ejs = require('ejs'),
    fs = require('fs'),
    postsTxt,
    postsObject;

    
postsTxt = fs.readFileSync('./posts.json', 'utf8');
postsObject = JSON.parse(postsTxt);    



function createLinks() {
    var links = '<ul class="allposts">', getMonth = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    postsObject.forEach(function (post) {
        links += '<li>' + post.day + ' ' + getMonth[post.month] + ' ' + post.year + ' ';
        links += '<a href="' + post.url + '">' + post.title + '</a>' + '</li>';         
    });
    
    links += '</ul>';

    return links;
}; 

/*
    This function generates the html for the home page
*/
function createPostHtml() {
    "use strict";
    
    var index, html, homeContent;
        
    index = fs.readFileSync('./template/index.ejs', 'utf8');
    
    homeContent = createLinks();

    if (!homeContent) {
        return '';
    }    
    
    html = ejs.render(index, {
        blog: {
            title: config.blog.name,
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
            content: homeContent
        }
    });
    
    return html;  
}




function compile() {
    "use strict";
    
    var html = createPostHtml();
    
    fs.writeFileSync('./posts/home.html', html, 'utf8');
    
    console.log('Home page created!');
}


/*
  Start compiling
*/
compile();

