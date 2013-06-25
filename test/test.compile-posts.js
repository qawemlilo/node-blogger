var should = require('should'),
    Compile = require('../lib/bin.compile-posts');


describe('Compile', function() {
    "use strict";
    
    var compile = new Compile();
    
    describe('#getNext()', function() {
        it('should return the url of the next blog post', function() {
            var next = compile.getNext();
            
            next.should.be.eql('/2011/8/15/lets-build-an-html5-app');
        });
    });
    
    describe('#getPrevious()', function() {
        it('should return false for previous url since we are on the first post', function() {
            var previous = compile.getPrevious();
            
            previous.should.be.false;
        });
    });
    
    describe('#toHtml()', function() {
        it('should convert markdown to html', function() {
            var html = compile.toHtml('#Hello World');
            
            html.should.be.eql('<h1>Hello World</h1>');
        });
    });
    
    describe('#compileTemplate()', function() {
        it('should compile EJS template to html', function() {
            var html, 
                data = {name: 'Que'},           
                template = '<h1>Hello <%= name %></h1>';
            
            html = compile.compileTemplate(template, data);
            
            html.should.be.eql('<h1>Hello Que</h1>');
        });
    });
    
    
    describe('#compileTemplateData()', function() {
        it('should return an object of a full post', function() {
            var data = compile.compileTemplateData(compile.posts[0], '<h1>Hello World</h1>');
            
            data.post.title.should.be.eql('Content Slider');
        });
    });
});

