define([
	'flight',
	'handlebars',
	'text!templates/scoreboard.hbs'
],
function (Flight, Handlebars, scoreboardHtml) {


	function Scoreboard() {
		this.template = Handlebars.compile(scoreboardHtml);

		this.defaultAttrs({
            playerQueue: '.js-player-queue',
            firstPlayer: '.js-first-player',
            secondPlayer: '.js-second-player'
        });

		this.after('initialize', function () {
			this.render();

			this.on('click', {
				'firstPlayer': this.firstPlayerScored,
				'secondPlayer': this.secondPlayerScored
			});
		});

		/**
		 * Handle the first player scoring a goal.
		 */
		this.firstPlayerScored = function () {
			console.log('first player scored');
			this.attr.game.scored(this.attr.game.players[0]);
			this.render();
		};

		/**
		 * Renders the player queue.
		 */
		this.getPlayerQueue = function () {
			var waitingPlayers = [];

			// gets the remaining players after the first two.
			for (var i = 2; i < this.attr.game.players.length; i++) {
				waitingPlayers.push(this.attr.game.players[i]);
			}

			return waitingPlayers;
		};

		this.render = function () {
			this.$node.html(this.template({
				firstPlayer: this.attr.game.players[0],
				secondPlayer: this.attr.game.players[1],
				waitingPlayers: this.getPlayerQueue()
			}));
		};

		/**
		 * Handles the second player scoring a goal.
		 */
		this.secondPlayerScored = function () {
			console.log('second player scored');
			this.attr.game.scored(this.attr.game.players[1]);
			this.render();
		};
	}

	return flight.component(Scoreboard);
});
