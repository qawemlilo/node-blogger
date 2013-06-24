var should = require('should'),
    routes = require('../routes');


describe('Routes', function() {
    "use strict";
    
    describe('#get()', function() {
        it('should load index', function() {
            routes('/').should.have.status(200)
        });
    });
});
