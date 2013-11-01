var express = require('express');
var app = express();
var port = 3000;

app.get('/', function (req, res) {
	var body = 'Hello World';
	res.send(body);
});

app.listen(port);

console.log('Listening on port ' + port);