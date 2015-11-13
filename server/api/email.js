var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'hmz820@mun.ca',
        pass: 'Viking0615'
    }
});

function loop(mailOptions, msgs){

	if(msgs.length>0){
		mailOptions.text = msgs.shift();
		transporter.sendMail(mailOptions, function(error, info){
			if(error){
				return;
			}
			loop(mailOptions, msgs);
			return;
		});
	} else return;
}
var _self = function (content, res) {
	var msgs = content.match(/.{1,110}/g),
		mailOptions = {
			to: '2266060064@txt.windmobile.ca',
			encoding: 'quoted-printable'
		};;
	
	loop(mailOptions, msgs);
	res.end();
}
module.exports = _self;