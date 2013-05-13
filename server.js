
/*
   Blog http server
*/

var http = require('http'),
    connect = require('connect'),
    port = process.env.PORT || 3080,
    routes = require('./routes'), 
    app;

app = connect()
  .use(connect.compress())
  .use(connect.static('template'), { maxAge: (1000 * 60 * 60 * 24) })
  .use(routes);


http.createServer(app).listen(port, function() {
  console.log('Blog server running at port %s', port);
});
