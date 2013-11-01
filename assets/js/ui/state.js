define([
	'flight',
	'handlebars',
	'text!templates/state.hbs'
],
function (Flight, Handlebars, stateHtml) {
	
	var CURRENT_PLAYERS_SELECTOR = '.js-current-players',
		PLAYER_QUEUE_SELECTOR = '.js-player-queue';

	function State() {
		this.template = Handlebars.compile(stateHtml);

		this.after('initialize', function () {
			this.render();
		});

		this.render = function () {
			this.$node.html(this.template());
		};
	}

	return flight.component(State);
});