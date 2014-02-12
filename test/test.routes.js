var should = require('should'),
    routes = require('../routes');

describe('Routes', function() {
    "use strict";

    describe("#GET /about", function(done) {
        var mockRes, mockReq;
        
        mockReq = {url: '/about'};
        mockRes = {
            writeHead: function writeHead(code, obj) {
                code.should.be.eql(404);
            },
            
            end: function writeHead(content) {
                content.should.include('Page not found');
            } 
        };
        
        it('should load /about route', function() {
            routes(mockReq, mockRes);
        });
    });
});
