var http = require('http');
var routes = require('./routes');

http.createServer(function(request,response){
	routes.home(request,response);
	routes.user(request,response);
}).listen(3000,'127.0.0.1');