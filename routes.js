
var Posts = require('./posts'), myposts, 

// Read all posts and create a cache 
myposts = new Posts();

module.exports.getPost = function (filename, fn) {
    var page = myposts.fetchPost(filename) || 'Page not found';

    fn(page);
};

module.exports.loadIndex = function (fn) {
    var page = myposts.fetchPost('index');

    fn(page);
};
