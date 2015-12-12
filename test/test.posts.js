var should = require('should'),
    Posts = require('../posts');


describe('Posts', function() {
    "use strict";

    var post = new Posts();

    describe('#fetchPost()', function() {
        it('should fetch a post', function() {
            post = post.fetchPost('2015-12-12_getting-started-with-node-blogger');

            post.should.include('<h1>Getting started with Node Blogger</h1>');
        });
    });
});
