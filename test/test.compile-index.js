var should = require('should'),
    Compile = require('../lib/homepage');

describe('Compile', function() {
    "use strict";

    var compile = new Compile({
        css: '',
        js: ''
    });

    describe('#toHtml()', function() {
        it('should convert markdown to html', function() {
            var html = compile.toHtml();

            html.should.include('<dl class="dl-horizontal">');
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

            data.blog.title.should.be.eql('Your blog title');
        });
    });
});
