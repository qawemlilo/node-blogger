var should = require('should'),
    routes = require('../routes');

describe('Routes', function() {
    "use strict";

    describe("#GET /about", function(done) {
        var mockRes, mockReq;
        
        mockReq = {url: '/about'};
        mockRes = {
            writeHead: function writeHead(code, obj) {
                code.should.be.eql(200);
            },
            
            end: function writeHead(content) {
                content.should.include('<h1>About this Blog</h1>');
            } 
        };
        
        it('should load /about route', function() {
            routes(mockReq, mockRes);
        });
    });
});
