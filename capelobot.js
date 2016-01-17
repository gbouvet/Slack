module.exports = function (req, res, next) {
	var userName = req.body.user_name;
	var text = req.body.text;
	var pattern = /o(d|t)?|eau(d|x)?|o(d|t)?|au(d|t|lt|x)?/g;
	var patternFin = /[a-zA-Z]+\.$/;
	var isPertinent = 0;
	var match;
	//var wsPattern = /( )*/;
	var words = text.split(' ');
	var processedText = new Array;
	var processedWord = new String;
	var isWordProcessed;

	for (var i = 0; i < words.length; i++) {
		isWordProcessed = 0;
		//match = pattern.exec(words[i]);
		processedWord = words[i];
		var copyW = new String(words[i].toString());
		words[i] = words[i].toLowerCase()
		while ((match = pattern.exec(words[i])) != null) {
			if (words[i].length > 3 
			&& match.index > 0 
			&& match.index > (words[i].length - 5)) {
				words[i] = words[i].toString().replace(pattern, "al");
				var tmp1W = copyW.toString().substring(0,match.index);
				var tmp2W = copyW.toString().substring(match.index,copyW.length);
				if(!(/o[^nmiu]/g.test(tmp2W))) {
					processedWord = tmp1W + tmp2W.replace(pattern, "al");
					isWordProcessed = 1;
					if (isPertinent == 0) {
						isPertinent = 1;
					}
				}
			}
		}
		// Exceptions
		if ('gratuit'.localeCompare(words[i]) == 0) {
			processedWord = "gratal";
			isPertinent = 1;
		}
		// Adding whitespace if not the last word of the sentence
		if (patternFin.exec(words[i]) == null && i < words.length) {
			processedWord += " ";
		}
		processedText += processedWord;
	}
	// avoid infinite loop
	if (userName !== 'slackbot' && isPertinent == 1) {
	
		var botPayload = {
			text : processedText
		};
	
		return res.status(200).json(botPayload);
	} else {
		return res.status(200).end();
	}
}