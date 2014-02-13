
/*
   This file contains the program that holds all posts and serves them out
*/


var fs = require('fs'), path = require('path');



/*
    Handles error messages
    
    @params: (String) msg - error message
*/ 
function handleError(msg) {
    console.log();
    console.log('Error');
    console.error(' > ' + msg);
    process.exit(1); 
}





/*
   Constructor function
*/
function Posts () {
    var self = this, postsTxt, postsArray;
    
    postsArray = require('./posts.json');  
    self.cache = {};

    if (!postsArray || postsArray.length < 1) {
        handleError('No posts were found.\n > Run `blogger --n` to create a new post.');
    }
    
    // add the index page
    try {
        self.cache.index = fs.readFileSync(path.join(__dirname, 'www', 'index.html'), 'utf8');
    }catch (e) {
        handleError('index.html not found.\n > Run the `blogger --build` command first.');
    }
   
    postsArray.forEach(function (file) {
        try {
            var data = fs.readFileSync(path.join(__dirname, 'www', file.filename + '.html'), 'utf8');
            
            self.cache[file.filename] = data;
        } catch (e) {
            handleError(file.filename + '.html not found.\n > Run the `blogger --build` command first.');
        }
    });
}





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


