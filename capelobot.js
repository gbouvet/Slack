module.exports = function (req, res, next) {
	var userName = req.body.user_name;
	var text = req.body.text;
	
	text = text.toLowerCase();
	var pattern = /o(d|t)?|eau(d|x)?|o(d|t)?|au(d|t|lt|x)?/g;
	var isPertinent = 0;
	if(text.match(pattern) != null){
		text = text.toString().replace(pattern, "al");
		var botPayload = {
			text : 'Si je peux me permettre...: ' + text + " :_capelo:"
		};
		isPertinent = 1;
	}
	
	// avoid infinite loop
	if (userName !== 'slackbot' && isPertinent == 1) {
		return res.status(200).json(botPayload);
	} else {
		return res.status(200).end();
	}
}