define([
	'express',	
	'handlebars',
	'config',
	'./templates/layout.html'
], 
function (express, handlebars, Config, layoutHtml) {

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

		this.app.listen(Config.port);

		console.log('Listening on port ' + Config.port);
	};

	return new Site();
});