
var compileIndex = require('./build-index'),
    compilePosts = require('./build-posts');
        
        
module.exports = function () {
    "use strict";
    
    var index = new compileIndex(),
        posts = new compilePosts();
    
    index.init();
    posts.init();
};

