var express = require('express');
var bodyParser = require('body-parser');
// Add hello module
var hellobot = require('./hellobot');
var capelobot = require ('./capelobot');

var app = express();
var port = process.env.PORT || 3000;
//console.log('DEBUG_');
// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// test route
app.get('/', function (req, res) { res.status(200).send('Hello world!') });

// Add route that listens for a POST to /hello
app.post('/hello', hellobot);

app.post('/capelo',capelobot);

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, function () {
  console.log('Slack bot listening on port ' + port);
});