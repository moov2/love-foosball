var express = require('express'),
	handlebars = require('handlebars'),
	config = require('./config'),
	layoutHtml = require('./templates/layout.html');

function Site () {
	this.initialise();
}

var p = Site.prototype;

p.initialise = function () {
	this.layoutTemplate = handlebars.compile(layoutHtml);
	this.app = express();
};

p.startSite = function  () {
	var self = this;
	this.app.get('/', function (req, res) {
		res.send(self.layoutTemplate());
	});

	this.app.use('/assets', express.static(__dirname + '/assets'));

	this.app.listen(config.port);

	console.log('Listening on port ' + config.port);
};

module.exports = new Site();
