var fs = require('fs'), Posts;

Posts = function (dir) {
    var self = this, files = readdirSync(dir);; 
    self.cache = Object.create({});
   
    files.forEach(function (filename) {
        if (filename.indexOf('.html') > 0) {
            var data = fs.readFileSync(dir + '/' + filename, 'utf8');
            self.cache[file] = data;
        }
    });
};

Posts.prototype.renderPost = function (page) {
    return this.cache[page];   
};


module.exports = Posts;

