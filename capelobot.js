module.exports = function (req, res, next) {
	var userName = req.body.user_name;
	var text = req.body.text;
console.log('DEBUG 1');
	text = text.toLowerCase();
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
console.log('DEBUG 2 : ' + words[i]);
		//match = pattern.exec(words[i]);
		processedWord = words[i];
		var copyW = new String(words[i].toString());
		while ((match = pattern.exec(words[i])) != null) {
console.log('DEBUG 3 : occ match ');
console.log('DEBUG 4 : index du match : ' + match.index);
			if (words[i].length > 3 && match.index > 1 && match.index > (words[i].length - 4)) {
				console.log('DEBUG 5 : match à traiter');
				words[i] = words[i].toString().replace(pattern, "al");
				var tmp1W = copyW.toString().substring(0,match.index);
				var tmp2W = copyW.toString().substring(match.index,copyW.length);
console.log('DEBUG 4bis : tmp1W : ' + tmp1W);
console.log('DEBUG 4bis : tmp2W : ' + tmp2W);
				processedWord = tmp1W + tmp2W.replace(pattern, "al");
				isWordProcessed = 1;
console.log('DEBUG 6 : mot processed : ' + processedWord);
				if (isPertinent == 0) {
					isPertinent = 1;
				}
			}
		}
		// Exceptions
		if ('gratuit'.localeCompare(words[i]) == 0) {
			processedWord = "gratal";
			isPertinent = 1;
		}
console.log('DEBUG 6bis : ctrl matching point : ' + patternFin.exec(words[i]));
		// Adding whitespace if not the last word of the sentence
		if (patternFin.exec(words[i]) == null && i < words.length) {
console.log('DEBUG 6ter : ajout du WS');
			processedWord += " ";
		}
		processedText += processedWord;
console.log('DEBUG 7 : mot ajouté à la liste : ' + processedText + '_');
	}
console.log('DEBUG 9');
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