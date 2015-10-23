var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'hmz820@mun.ca',
        pass: 'Viking0615'
    }
});

var _self = function (content, res) {
	var msgs = content.match(/.{1,109}/g);
	msgs.reverse().forEach(function(msg){		
		var mailOptions = {
			to: '2266060064@txt.windmobile.ca',
			text: msg
		};

		transporter.sendMail(mailOptions, function(error, info){
			if(error){
				return;
			}
			// res.end('Message sent: ' + info.response);
			return;
		});
	});
	res.end();
}
module.exports = _self;