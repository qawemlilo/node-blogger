
"use strict";

var compileIndex = require('./build-index'),
    compilePosts = require('./build-posts');
        
        
module.exports = function () {
    var index = new compileIndex(),
        posts = new compilePosts();
    
    index.init();
    posts.init();
};

