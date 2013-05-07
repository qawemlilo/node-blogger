
var http = require('http'),
    url = require('url'),
    connect = require('connect'),
    port = process.env.PORT || 3080,
    routes = require('./routes'), 
    app;


function parseFilename(path) {
    if (path === '/') {
        return path;
    }
    var separatorIndex = path.lastIndexOf('/'), tempFilename, filename;
    
    tempFilename = path.substring(1, separatorIndex) + '_' + path.substring(separatorIndex + 1);
    filename = tempFilename.replace(/\//g, '-');
    
    return filename;
}


app = connect()
  .use(connect.static('template'))
  .use(function (req, res) {
    var path = url.parse(req.url).path, filename; 
    
    if (path === '/') {
        routes.loadIndex(function (page) {
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            });
            
            res.end(page);
        });
    }
    else {
        filename = parseFilename(path);
    
        routes.getPost(filename, function (page) {
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            });
            
            res.end(page);
        });
    }
  });


http.createServer(app).listen(port, function() {
  console.log('App running at port %s', port);
});