var should = require('should'),
    config = require('../config.json'),
    Compile = require('../lib/build-index');

describe('Compile', function() {
    "use strict";
    
    var compile = new Compile();

    describe('#toHtml()', function() {
        it('should convert markdown to html', function() {
            var html = compile.toHtml();
            
            html.should.include('<ul class="allposts">');
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
            var data = compile.compileTemplateData('<h1>Hello World</h1>');
            
            data.blog.title.should.be.eql(config.blog.name);
        });
    });
});

