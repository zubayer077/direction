var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'hmz820@mun.ca',
        pass: 'Viking0615'
    }
});

var transporter1 = nodemailer.createTransport(smtpTransport({
    host: 'rsb20.rhostbh.com',
    port: 465,
	secure: true,
	authMethod: 'PLAIN',
    auth: {
        user: 'i@zubayer.com',
        pass: 'Viking724'
    }
}));


var _self = function (content, res) {
	var msgs = content.match(/.{1,112}/g),
		mailOptions = {
			from: 'hmz820@mun.ca',
			to: '2266060064@txt.windmobile.ca',
			encoding: 'quoted-printable'
		};
	
	function cb(error, info){
		if(error){
			return;
		}
		return;
	}
	msgs.reverse().forEach(function(msg){
		mailOptions.text = msg;
		if (mailOptions.from == "i@zubayer.com"){
			transporter1.sendMail(mailOptions, cb);
			mailOptions.from = 'hmz820@mun.ca';
		} else {
			transporter.sendMail(mailOptions, cb);
			mailOptions.from = 'i@zubayer.com';
		}
	});
	res.end();
}
module.exports = _self;