
"use strict";

var compileIndex = require('./bin.compile-index'),
    compilePosts = require('./bin.compile-posts');
        
        
module.exports = function () {
    var index = new compileIndex(),
        posts = new compilePosts();
    
    index.init();
    posts.init();
};

