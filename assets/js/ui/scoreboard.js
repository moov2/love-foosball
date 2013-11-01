define([
	'flight',
	'handlebars',
	'text!templates/scoreboard.hbs'
],
function (Flight, Handlebars, scoreboardHtml) {
	
	var CURRENT_PLAYERS_SELECTOR = '.js-current-players',
		PLAYER_QUEUE_SELECTOR = '.js-player-queue';

	function Scoreboard() {
		this.template = Handlebars.compile(scoreboardHtml);

		this.after('initialize', function () {
			this.render();
		});

		this.render = function () {
			this.$node.html(this.template({ players: this.attr.game.players }));
		};
	}

	return flight.component(Scoreboard);
});