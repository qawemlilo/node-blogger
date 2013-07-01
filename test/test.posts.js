var should = require('should'),
    Posts = require('../posts');


describe('Posts', function() {
    "use strict";
    
    var post = new Posts();
    
    describe('#fetchPost()', function() {
        it('should fetch a post', function() {
            post = post.fetchPost('2013-7-1_about-this-blog');
            
            post.should.include('<h1>About this Blog</h1>');
        });
    });
});
