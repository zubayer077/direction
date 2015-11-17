var nodemailer = require('nodemailer'),
	smtpTransport = require('nodemailer-smtp-transport');

// create reusable transporter object using SMTP transport
var transporter =  new Array();

transporter[0] = {};
transporter[0].from = 'h.zu@aol.com';
transporter[0].smtp  = nodemailer.createTransport({
    domains: ["aol.com"],
    host: "smtp.aol.com",
    port: 587,
    auth: {
        user: 'h.zu@aol.com',
        pass: 'Viking724'
    }
});


transporter[1] = {};
transporter[1].from = 'hmz820@mun.ca';
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'hmz820@mun.ca',
        pass: 'Viking0615'
    }
});


transporter[2] = {};
transporter[2].from = 'i@zubayer.com';
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