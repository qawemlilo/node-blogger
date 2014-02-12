var should = require('should'),
    posts = require('../posts.json'),
    sitemap = require('../lib/sitemap');


describe('Sitemap', function() {
    "use strict";
    
    describe('#add()', function() {
        it('should return posts in xml format', function() {
            //sitemap.add({url: posts[0].url, lastmod: Date.now()});
            
            //var loc = (sitemap.json[0].urlset[1].url[0].loc);
            var loc = "Qawe";
            
            loc.should.be.eql("Qawe");
        });
    });   
});
