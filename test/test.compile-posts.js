var should = require('should'),
    Compile = require('../lib/build-posts');


describe('Compile', function() {
    "use strict";
    
    var compile = new Compile();
    
    describe('#getNext()', function() {
        it('should return the url of the next blog post', function() {
            var next = compile.getNext();
            
            if (compile.posts.length > 1) {
                next.should.include('/201');
            }
            else {
                next.should.be.false;
            }
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
            
            data.post.content.should.include('<h1>Hello World</h1>');
        });
    });
});

