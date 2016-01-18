module.exports = function (req, res, next) {
	var userName = req.body.user_name;
	var text = req.body.text;
	var pattern = /o[^imnu]|eau|au/;
	var patternO = /o[^imnu]/;
	var patternAu = /au/;
	var patternEau = /eau/;
	var patternFin = /[a-zA-Z]+[\.\?\!]/g;
	var isPertinent = 0;
	var match;
	var words = text.split(' ');
	var processedText = new Array;
	var processedWord = new String;
	for (var i = 0; i < words.length; i++) {
		processedWord = words[i];
		var copyW = new String(words[i].toString());
		words[i] = words[i].toLowerCase();
		while ((match = pattern.exec(words[i])) != null) {
			if (words[i].length >= 3 && match.index > 0 ) {
				words[i] = words[i].toString().replace(pattern, "al");
				if (patternO.test(copyW)) {
					var lastIndxO = copyW.toString().lastIndexOf('o');
					if(lastIndxO == copyW.length - 1 || lastIndxO == copyW.length - 2 ) {
						var firstPart = copyW.toString().substring(0,lastIndxO);
						var secondPart = copyW.toString().substring(lastIndxO,lastIndxO + 1);
						processedWord = firstPart + secondPart.replace(patternO, "al");
						if (isPertinent == 0) {
							isPertinent = 1;
						}
					}
				} else if (patternEau.test(words[i])) {
					var lastIndxEau = words[i].toString().lastIndexOf('eau');
					if(lastIndxEau == words[i].length - 3 || lastIndxEau == words[i].length - 4 ) {
						var firstPart = copyW.toString().substring(0,lastIndxEau);
						var secondPart = copyW.toString().substring(lastIndxEau,lastIndxEau + 3);
						processedWord = firstPart + secondPart.replace(patternEau, "al");
						if (isPertinent == 0) {
							isPertinent = 1;
						}
					}
				} else if (patternAu.test(copyW)) {
					var lastIndxAu = copyW.toString().lastIndexOf('au');
					if(lastIndxAu == copyW.length - 2 || lastIndxAu == copyW.length - 3 ) {
						var firstPart = copyW.toString().substring(0,lastIndxAu);
						var secondPart = copyW.toString().substring(lastIndxAu,lastIndxAu + 2);
						processedWord = firstPart + secondPart.replace(patternAu, "al");
						if (isPertinent == 0) {
							isPertinent = 1;
						}
					}
				}
			}
		}
		// Specific cases
		if ('gratuit'.localeCompare(words[i]) == 0) {
			processedWord = "gratal";
			if (isPertinent == 0) {
				isPertinent = 1;
			}
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