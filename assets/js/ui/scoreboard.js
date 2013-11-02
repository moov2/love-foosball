define([
	'flight',
	'handlebars',
	'text!templates/scoreboard.hbs'
],
function (Flight, Handlebars, scoreboardHtml) {


	function Scoreboard() {
		this.template = Handlebars.compile(scoreboardHtml);

		this.hasRendered = false;

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
			this.attr.game.scored(this.getFirstPlayer());
			this.updatePlayersInView();
		};

		/**
		 * Returns the first player.
		 */
		this.getFirstPlayer = function () {
			return this.attr.game.players[0];
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

		/**
		 * Returns the second player.
		 */
		this.getSecondPlayer = function () {
			return this.attr.game.players[1];
		};

		this.render = function () {
			this.$node.html(this.template({
				firstPlayer: this.getFirstPlayer(),
				secondPlayer: this.getSecondPlayer(),
				waitingPlayers: this.getPlayerQueue()
			}));

			this.hasRendered = true;
		};

		/**
		 * Handles the second player scoring a goal.
		 */
		this.secondPlayerScored = function () {
			this.attr.game.scored(this.getSecondPlayer());
			this.updatePlayersInView();
		};

		/**
		 * To avoid re-rendering the whole view, lets just update the required
		 * attributes.
		 */
		this.updatePlayersInView = function () {
			// first player.
			this.select('firstPlayer').find('.js-player-thumbnail').attr('src', this.getFirstPlayer().photo);
			this.select('firstPlayer').find('.js-player-score').html(this.getFirstPlayer().score);

			// second player
			this.select('secondPlayer').find('.js-player-thumbnail').attr('src', this.getSecondPlayer().photo);
			this.select('secondPlayer').find('.js-player-score').html(this.getSecondPlayer().score);

			// update the player queue.
			var waitingPlayers = this.getPlayerQueue();

			for (var i = 0; i < waitingPlayers.length; i++) {
				this.select('playerQueue').find('li:eq(' + i + ') > .js-player-thumbnail').attr('src', waitingPlayers[i].photo);
			}
		};
	}

	return flight.component(Scoreboard);
});
