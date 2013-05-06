var fs = require('fs'), 
    postsTxt;



function Posts () {
    var self = this, postsTxt, postsObject;
    
    postsTxt = fs.readFileSync('./posts.json', 'utf8');
    postsObject = JSON.parse(postsTxt);  
    
    self.cache = Object.create({});
    self.posts = postsObject;
    
    // add the home page
    self.cache['home'] = fs.readFileSync('./posts/home.html', 'utf8');
   
    postsObject.forEach(function (file) {
        var data = fs.readFileSync('./posts/' + file.filename + '.html', 'utf8');
        
        self.cache[file.filename] = data;
    });
};

Posts.prototype.renderPage = function (page) {
    if (this.cache.hasOwnProperty(page)) {
        return this.cache[page];
    } 
    else {
        return false;
    }    
};


module.exports = Posts;

