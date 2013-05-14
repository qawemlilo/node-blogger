
/*
   Blog http server
*/

var http = require('http'),
    connect = require('connect'),
    port = process.env.PORT || 3080,
    routes = require('./routes'), 
    app,
    OneDay = (1000 * 60 * 60 * 24);

    
app = connect()
  .use(connect.static(__dirname + '/template'), {maxAge: OneDay})
  .use(connect.compress())
  .use(routes);


http.createServer(app).listen(port, function() {
  console.log('Blog server running at port %s', port);
});
