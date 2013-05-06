
var Posts = require('./posts'), 
    allposts = new Posts();


module.exports.getPage = function (filename, fn) {
    var page = allposts.renderPage(filename) || 'Page not found';

    fn(page);
};

module.exports.loadHome = function (fn) {
    var page = allposts.renderPage('home');

    fn(page);
};
