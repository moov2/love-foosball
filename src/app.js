var fs = require('fs');

require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

var express = require('express'),
	handlebars = require('handlebars'),
	layout = require('./templates/layout.html'),
	layoutTemplate = handlebars.compile(layout),
	app = express(),
	port = 3000;


app.use('/assets', express.static(__dirname + '/assets'));


app.get('/', function (req, res) {
	res.send(layoutTemplate());
});

app.listen(port);

console.log('Listening on port ' + port);
