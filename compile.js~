
var config = require('./config'),
    markdown = require('markdown').markdown,
    ejs = require('ejs'),
    fs = require('fs');
    
var posts = fs.readFileSync('./posts.json', 'utf8'),

posts = JSON.parse(posts);
   
var mdToHtml = function (filename) {
    var contents = fs.readFileSync(filename, 'utf8'),
        html = markdown.toHTML(contents);
    
    return html; 
};


var getPostObject = function (filename) {
    for (var i = 0; i < posts.length; i++) {
        if (posts[i].filename === filename) {
            return posts[i];
        }
    }
    
    return false;
};


var compile = function (filename, fn) {
    var contents = fs.readFileSync('./template/index.ejs', 'utf8'),
        postdata = getPostObject(filename),
        html,
        postContent = mdToHtml('./posts/' + filename + '.md'),
        
        html = ejs.render(contents, {
            blog: {
                title: config.blog.name + ' - ' + postdata.title,
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
                title:  postdata.title,
                year: postdata.year,
                month: postdata.month,
                day: postdata.day,
                content: postContent
            }
        });
    
    fn(html);  
};


compile('2013-5-6_hello-world', function(html) {
    fs.writeFile('./posts/2013-5-6_hello-world.html', html, function (error) {
       if (error) {
           console.log('An error occured');
       } 
       else {
           console.log(html);
       }
    });
})
    

