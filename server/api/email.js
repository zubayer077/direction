var nodemailer = require('nodemailer'),
	smtpTransport = require('nodemailer-smtp-transport');

// create reusable transporter object using SMTP transport
var transporter =  new Array();

transporter.push({
	from : 'hmz820@mun.ca',
	smtp : nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'hmz820@mun.ca',
			pass: 'Viking0615'
		}
	});
});

transporter.push({
	from : 'h.zu@aol.com',
	smtp : nodemailer.createTransport({
		domains: ["aol.com"],
		host: "smtp.aol.com",
		port: 587,
		auth: {
			user: 'h.zu@aol.com',
			pass: 'Viking724'
		}
	});
});

transporter.push({ 
	from : 'i@zubayer.com',
	smtp : nodemailer.createTransport(smtpTransport({
		host: 'rsb20.rhostbh.com',
		port: 465,
			secure: true,
			authMethod: 'PLAIN',
		auth: {
			user: 'i@zubayer.com',
			pass: 'Viking724'
		}
	}));
});


var _self = function (content, res) {
	var msgs = content.match(/.{1,112}/g),
		mailOptions = {
			to: '2266060064@txt.windmobile.ca',
			encoding: 'quoted-printable'
		},
		index = 0;
	
	msgs.reverse().forEach(function(msg){
		mailOptions.text = msg;
		mailOptions.from = transporter[index].from;
		
		transporter[index].smtp.sendMail(mailOptions, 	function (error, info){
			if(error){
				return;
			}
			return;
		});
		index = index==2?0:index+1;
	});
	res.end();
}
module.exports = _self;