var should = require('should'),
    RSS = require('../lib/rss');


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
