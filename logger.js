var winston = require('winston'),
	path = require('path');

var logger = new (winston.Logger)({
	transports: [
		new (require('winston-daily-rotate-file'))({
			filename: path.join('logs', 'node.log'),
			datePattern: '.yyyy-MM-dd',
			json: false,
			handleExceptions: true
		})
	]
});

module.exports = logger;