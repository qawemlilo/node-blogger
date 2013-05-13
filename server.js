
/*
   Blog http server
*/

var http = require('http'),
    connect = require('connect'),
    port = process.env.PORT || 3080,
    routes = require('./routes'), 
    app,
    OneDay = 86400000;

app = connect()
  .use(connect.compress())
  .use(connect.static(__dirname + '/template'))
  .use(connect.static(__dirname + '/template'), { maxAge: OneDay })
  .use(routes);


http.createServer(app).listen(port, function() {
  console.log('Blog server running at port %s', port);
});
