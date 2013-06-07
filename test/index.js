var should = require('should'),
    fs = require('fs'),
    
    Post = require('../lib/post'),
    options = {
        title: 'New Post Test',
        date: Date.now(),
        categories: ['mocha', 'test']
    },
    
    RSS = require('../rss');


describe('Post', function() {
    "use strict";
    
    var post = new Post(options);
    
    describe('#createPost()', function() {
        it('should create a Post', function() {
            post.createPost();
            
            post.title.should.be.eql(options.title);
            post.date.should.be.eql(new Date(options.date));
            post.categories.length.should.be.eql(options.categories.length);
            post.url.should.be.eql(post.createUrl());
        });
    });

    afterEach(function(done) {
        fs.unlink('./posts/' + post.filename + '.md', function (error) {
            if (error) {
                throw error;
            }
            done();
        });  
    });   
});


describe('RSS', function() {
    "use strict";
    
    var rss = new RSS();
    
    describe('#getFeed()', function() {
        it('should return posts in xml format', function() {
            rss.getFeed();
            rss.xml.should.not.be.false;
        });
    });   
});