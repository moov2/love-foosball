define([
    'underscore'
],

/**
 * Module keeps track of the current game in progress.
 */
function (_) {

        /**
         * Mimimum duration of a game.
         */
    var DURATION_MINIMUM = 180;

    function Game (options) {
        this.initialise(options);
    }

    var p = Game.prototype = {};

    /**
     * Calculate the duration of the match in seconds.
     */
    p.calculateMatchDuration = function () {
        this.duration = this.players.length * 60;

        if (this.duration < DURATION_MINIMUM) {
            this.duration = DURATION_MINIMUM;
        }
    };

    p.initialise = function (options) {
    	if (options && options.players) {
    		this.setPlayers(options.players);
    	}
    };

    /**
     * Player has scored so the order must be updated so the player who conceeded
     * moves to the end of the queue.
     */
    p.scored = function (player) {
        var didntScore = (this.players[0] === player) ? this.players[1] : this.players[0];
        var playerScoredIndex = this.players.indexOf(player);

        // adds a goal to the player.
        player.score++;

        // remove the player that didn't score and add them to the end.
        this.players.splice(this.players.indexOf(didntScore), 1);
        this.players.push(didntScore);

        // ensure the player who scored remains in the same position.
        if (playerScoredIndex !== this.players.indexOf(player)) {
            this.players[this.players.indexOf(player)] = this.players[playerScoredIndex];
            this.players[playerScoredIndex] = player;
        }

        // reset the winning / losing flags
        for (var i = 0; i < this.players.length; i++) { this.players[i].winning = this.players[i].losing = false; }

        // determine whose winning and losing.
        var leaderboard = _.sortBy(this.players, function (player) { return player.score }).reverse();

        leaderboard[0].winning = leaderboard[0].score > leaderboard[1].score;
        leaderboard[leaderboard.length - 1].losing = leaderboard[leaderboard.length - 1].score < leaderboard[leaderboard.length - 2].score;
    };

    /**
     * Sets the order of the current players, this depicts the starting order.
     */
    p.setOrder = function () {
        // later on the order will be determine by previous matches.
        this.players = _.shuffle(this.players);
    };

    p.setPlayers = function (players) {
    	this.players = players;

        this.setOrder();
        this.calculateMatchDuration();
        this.setStartingScores();
    };

    /**
     * Sets the starting scores for the players. In the future, pity points will
     * be awarded based on who lost previous matches.
     */
    p.setStartingScores = function () {
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].score = 0;
        }
    };

    return Game;
});
