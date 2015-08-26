var express = require("express");
	
	
var	_self = function(){
		

		var router = express.Router();

		console.log("profile js is initialized", express.Router);
		// router.use(function(req, res, next){
		
			// next();
		// });
		
		router.route("/").get(function(req, res){
			console.log("within profile js");
		
		})
		return router;
	}
module.exports = _self;