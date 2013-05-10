
/*
   This file contains the program that holds all posts and serves them out
*/


var fs = require('fs');




/*
   Constructor function
*/
function Posts () {
    var self = this, postsTxt, postsArray;
    
    postsArray = require('./posts.json');  
    self.cache = Object.create({});

    if (!postsArray || postsArray.length < 1) {
        console.log('No posts were found');
        process.exit();
    }
    
    // add the index page
    self.cache['index'] = fs.readFileSync('./posts/index.html', 'utf8');
   
    postsArray.forEach(function (file) {
        var data = fs.readFileSync('./posts/' + file.filename + '.html', 'utf8');
        
        self.cache[file.filename] = data;
    });
};




/*
   This method serves out posts
   
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

