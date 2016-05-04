var express = require('express'),
	path = require('path'),
	lactate = require('lactate'),
	direction = require(path.join(__dirname, "server", "api", "direction.js")),
	email = require(path.join(__dirname, "server", "api", "email.js")),
	
	app = express(),
	files = lactate.dir("public", {});
	
app.use(files.toMiddleware());
app.use(express.bodyParser());

app.post("/sendemail", function(req, res){
	email(req.body.content, res);
	return;
});
app.get("/:q", function(req, res){
	direction('https://maps.googleapis.com/maps/api/directions/json?origin='+req.params.q+'&destination=43.423211,-80.441337&mode=transit&key=AIzaSyDCMhZrfLlTvXGkaXgv3HWD5nTZAuJG7ig', res);
	return;
});
app.get("/:q/:d", function(req, res){
	direction('https://maps.googleapis.com/maps/api/directions/json?origin='+req.params.q+'&destination='+(req.params.d?req.params.d:'43.423211,-80.441337')+'&mode=transit&key=AIzaSyDCMhZrfLlTvXGkaXgv3HWD5nTZAuJG7ig', res);
	return;
});
app.get("/", function(req, res){
	res.redirect(307, "http://zubayer.com");
	return;
});

var server = app.listen(4010, function () {
});