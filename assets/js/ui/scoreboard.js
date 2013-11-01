define([
	'flight',
	'handlebars',
	'ui/scorebuttons',
	'text!templates/scoreboard.hbs',
	'text!templates/waitingplayers.hbs'
],
function (Flight, Handlebars, ScoreButtons, scoreboardHtml, waitingPlayersHtml) {

	var SCOREBUTTONS_SELECTOR = '.js-score-buttons';

	function Scoreboard() {
		this.template = Handlebars.compile(scoreboardHtml);
		this.templatePlayerQueue = Handlebars.compile(waitingPlayersHtml);

		this.defaultAttrs({
            playerQueue: '.js-player-queue'
        });

		this.after('initialize', function () {
			this.render();

			this.setupScorebuttons();

			this.on(document, 'scorebuttons:playerscored', this.renderPlayerQueue);
		});

		this.render = function () {
			this.$node.html(this.template());
			this.renderPlayerQueue();
		};

		/**
		 * Renders the player queue.
		 */
		this.renderPlayerQueue = function () {
			var waitingPlayers = [];

			// gets the remaining players after the first two.
			for (var i = 2; i < this.attr.game.players.length; i++) {
				waitingPlayers.push(this.attr.game.players[i]);
			}

			this.select('playerQueue').html(this.templatePlayerQueue({ waitingPlayers: waitingPlayers }));
		};

		this.setupScorebuttons = function () {
			ScoreButtons.attachTo(SCOREBUTTONS_SELECTOR, {
				game: this.attr.game
			});
		};
	}

	return flight.component(Scoreboard);
});
