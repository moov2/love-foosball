define([],

/**
 * Module keeps track of the current game in progress.
 */
function () {

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
    };

    /**
     * Sets the order of the current players, this depicts the starting order.
     */
    p.setOrder = function () {
        // later on the order will be determine by previous matches.
        this.shufflePlayers();
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

    /**
     * Randomly sorts the players.
     * Source: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/12646864#12646864
     */
    p.shufflePlayers = function () {
        for (var i = this.players.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this.players[i];
            this.players[i] = this.players[j];
            this.players[j] = temp;
        }
    };

    return Game;
});
