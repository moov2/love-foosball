define([
	'flight',
	'handlebars',
	'domain/match',
	'text!templates/state.hbs'
],
function (Flight, Handlebars, MatchData, stateHtml) {
	
	var CURRENT_PLAYERS_SELECTOR = '.js-current-players',
		PLAYER_QUEUE_SELECTOR = '.js-player-queue';

	function State() {
		this.template = Handlebars.compile(stateHtml);

		this.after('initialize', function () {
			this.render();
		});

		this.render = function () {
			this.$node.html(this.template({ players: this.attr.matchData.players }));
		};
	}

	return flight.component(State);
});