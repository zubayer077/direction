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
	if (content.length>113){
		res.status(404).send("More than 113");
		return;
	}

	var mailOptions = {
		to: '2266060064@txt.windmobile.ca',
		subject: content
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			res.end(error);
			return;
		}
		res.end('Message sent: ' + info.response);
		return;
	});
}
module.exports = _self;