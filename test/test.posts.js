var should = require('should'),
    Posts = require('../posts');


describe('Posts', function() {
    "use strict";
    
    var post = new Posts();
    
    describe('#fetchPost()', function() {
        it('should fetch a post', function() {
            post = post.fetchPost('2011-8-15_content-slider');
            
            post.should.include('<h1>Content Slider</h1>');
        });
    });
});
