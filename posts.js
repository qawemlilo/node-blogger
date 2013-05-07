var fs = require('fs');



/*
   Constructor function
*/
function Posts () {
    var self = this, postsTxt, postsArray;
    
    postsArray = self.getPostsArray();  
    self.cache = Object.create({});
    
    // add the index page
    self.cache['index'] = fs.readFileSync('./posts/index.html', 'utf8');
   
    postsArray.forEach(function (file) {
        var data = fs.readFileSync('./posts/' + file.filename + '.html', 'utf8');
        
        self.cache[file.filename] = data;
    });
};




/*
   This method reads ./posts.json (which contains all posts entries) and returns the contents in JSON format
   
   @returns: JSON
*/
Posts.prototype.getPostsArray = function () {
    var postsTxt, posts;
    
    postsTxt = fs.readFileSync('./posts.json', 'utf8');
    posts = JSON.parse(postsTxt);
    
    return posts;
} 




/*
   Looks up for a post returns the html data
   
   @param: (String) page - name of the post to be fetched
*/
Posts.prototype.fetchPost = function (page) {
    if (this.cache.hasOwnProperty(page)) {
        return this.cache[page];
    } 
    else {
        return false;
    }    
};


module.exports = Posts;

