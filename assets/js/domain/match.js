define([],

/**
 * Module keeps track of the current match in progress.
 */
function () {

        /**
         * Minimum length of a game.
         */
    var DURATION_MINIMUM = 180;

    function Match () {
        this.players = [];
    }

    var p = Match.prototype = {};

    /**
     * Calculate the duration of the match in seconds.
     */
    p.calculateMatchDuration = function () {
        this.duration = this.players.length * 60;

        if (this.duration < DURATION_MINIMUM) {
            this.duration = DURATION_MINIMUM;
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

    /**
     * Sets the order of the current players, this depicts the starting order.
     */
    p.setOrder = function () {
        // later on the order will be determine by previous matches.
        this.randomizePlayers();
    };

    p.setPlayers = function (players) {
    	this.players = players;

        this.setOrder();
        this.calculateMatchDuration();
    };

    return new Match();
});
