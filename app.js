var express = require('express'),
	path = require('path'),
	lactate = require('lactate'),
	
	app = express(),
	files = lactate.dir("public", {});
	
app.use(files.toMiddleware());

app.get('/', function(req, res){
	// files.serve("index.html", req, res);
	res.redirect(307, "http://zubayer.com");
	return;
});
app.get('/*', require(path.join(__dirname, "server", "api", "direction.js")));

var server = app.listen(4010, function () {
});