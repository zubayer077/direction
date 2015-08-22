var express = require('express'),
	request = require('request');

var app = express(), output = "";

function loopBranch(direction){
	
	if(Object.prototype.toString.call(direction) === '[object Array]'){
		direction.forEach(function(val){
			loopBranch(val)
		});
	} else {
		for (var prop in direction){
			if(Object.prototype.toString.call(direction[prop]) === '[object Array]'){
				direction[prop].forEach(function(val){
					loopBranch(val)
				});
			}
			if(prop == "html_instructions"){
				var dateString = "";
				if (direction["transit_details"]){
					var transit_details = direction["transit_details"],
						dt = new Date(direction["transit_details"].departure_time.value*1000);
					dateString += " to "+direction["transit_details"].arrival_stop.name+" at "+(dt.getHours()<=12?dt.getHours():dt.getHours()-12)+":"+dt.getMinutes()+" on "+dt.getDate();
				}
				output +=" <br>"+direction[prop] +dateString;
			}
		}
	}
}
app.get('/*', function (req, res) {
	output = "";
	var url = "";
	if(req.query.q || req.query.d){
		url += 'https://maps.googleapis.com/maps/api/directions/json?origin='+req.query.q+'&destination='+(req.query.d?req.query.d:'147+Scott+Rd,+Cambridge+ON,+Canada')+'&mode=transit&key=AIzaSyDCMhZrfLlTvXGkaXgv3HWD5nTZAuJG7ig';
	} else if (req.params[0]){
		url += 'https://maps.googleapis.com/maps/api/directions/json?origin='+req.params[0]+'&destination=147+Scott+Rd,+Cambridge+ON,+Canada&mode=transit&key=AIzaSyDCMhZrfLlTvXGkaXgv3HWD5nTZAuJG7ig';
	} else {
		res.end("");
		return;
	}
	request.get(url, function(error, response, body){
		if (!error && response.statusCode == 200) {
			var direction = {};
			try{
				direction = JSON.parse(body);
			} catch(e){
			}
			loopBranch(direction);
			res.end(output);
		}
	});
});

var server = app.listen(4010, function () {
});