
var Post = require('./lib/post'),
    ejs = require('ejs');

var post = new Post({
    title: 'Hello world'
});

post.on('error', function (error) {
    console.log(error.msg);
});
post.on('complete', function () {
    console.log('Post created');
});