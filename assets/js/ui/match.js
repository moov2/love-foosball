define([
	'flight',
	'handlebars',
	'text!templates/match.hbs'
],

function (Flight, Handlebars, matchHtml) {

	var MATCH_SELECTOR = '.js-match';

	function Match() {
		
		this.template = Handlebars.compile(matchHtml);

        this.after('initialize', function() {
            this.render();
        });

        this.render = function () {
        	this.$node.html(this.template());
        };
	}
	
	return flight.component(Match);
});