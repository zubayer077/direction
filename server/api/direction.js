var request = require('request'), 
	output = "";


/* static instance */
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
				} else if (direction["distance"]){
					dateString += " "+direction["distance"].text;
				}
				var strippedText = direction[prop];
				if (strippedText.indexOf("Walk to 3075-3085 Kingsway Dr")>-1)
					return;
				output +=" <br>"+strippedText+dateString;
			}
		}
	}
}

var _self = function (url, res) {
	if(!url){
		res.end();
		return;
	}
	output = "";
	request.get(url, function(error, response, body){
		if (!error && response.statusCode == 200) {
			var direction = {};
			try{
				direction = JSON.parse(body);
			} catch(e) {
			}
			loopBranch(direction);
			res.end(output);
		}
	});
}
module.exports = _self;