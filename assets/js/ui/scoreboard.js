define([
	'flight',
	'handlebars',
	'ui/scorebuttons',
	'text!templates/scoreboard.hbs'
],
function (Flight, Handlebars, ScoreButtons, scoreboardHtml) {
	
	var SCOREBUTTONS_SELECTOR = '.js-score-buttons',
		PLAYER_QUEUE_SELECTOR = '.js-player-queue';

	function Scoreboard() {
		this.template = Handlebars.compile(scoreboardHtml);

		this.after('initialize', function () {
			this.render();

			this.setupScorebuttons();
		});

		this.render = function () {
			this.$node.html(this.template({ players: this.attr.game.players }));
		};

		this.setupScorebuttons = function () {
			ScoreButtons.attachTo(SCOREBUTTONS_SELECTOR, {
				game: this.attr.game
			});
		};
	}

	return flight.component(Scoreboard);
});