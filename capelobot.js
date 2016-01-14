module.exports = function (req, res, next) {
	var text = req.body.text;
	
	text = text.toLowerCase();

	var pattern = /o(d|t)?|eau(d|x)?|o(d|t)?|au(d|t|lt|x)?/g;
	text = text.toString().replace(pattern, "al");
	
	var botPayload = {
		text : 'Si je peux me permettre...: ' + text + " 	:_capelo:"
	};

	// avoid infinite loop
	if (userName !== 'slackbot') {
		return res.status(200).json(botPayload);
	} else {
		return res.status(200).end();
	}
}