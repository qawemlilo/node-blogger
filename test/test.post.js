var should = require('should'),
    fs = require('fs'),
    path = require('path'),
    Post = require('../lib/post'),
    options = {
        title: 'New Post Test',
        date: Date.now(),
        categories: ['mocha', 'test']
    };


describe('Post', function() {
    "use strict";
    
    var post = new Post(options);
    
    describe('Post#createPost(),Posts#fetchPost', function() {
        it('should create a Post', function() {
            post.createPost();
            post.title.should.be.eql(options.title);
            post.date.should.be.eql(new Date(options.date));
            post.categories.length.should.be.eql(options.categories.length);
        });
    });
    
    afterEach(function(done) {
        fs.unlink(path.resolve(__dirname, '../posts', post.filename + '.md'), function (error) {
            if (error) {
                throw error;
            }
            var posts = require('../posts.json');
            posts.pop();
            post.savePosts(posts);
            done();
        });  
    }); 
});


describe('Post', function() {
    "use strict";
    
    var post = new Post(options);

    describe('#slug()', function() {
        it('should create a post slug', function() {
            var slug  = post.slug('My name is Qawe'), 
                slug2  = post.slug('Joomla!, <open source>');
            
            slug.should.be.eql('my-name-is-qawe');
            slug2.should.be.eql('joomla-open-source');
        });
    });

    describe('#createFilename()', function() {
        it('should create a post filename', function() {
            var date = new Date(), 
                filename = post.createFilename(); 
            
            filename.should.be.eql(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '_new-post-test');
        });
    });
    
    
    describe('#createUrl()', function() {
        it('should create a post url', function() {
            var date = new Date(), 
                url = post.createUrl(); 
            
            url.should.be.eql('/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + '/new-post-test');
        });
    });
});

