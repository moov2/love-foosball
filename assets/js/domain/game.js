define([],

/**
 * Module keeps track of the current game in progress.
 */
function () {

    function Game (options) {
        this.initialise(options);
    }

    var p = Game.prototype = {};

    p.initialise = function (options) {
    	if (options && options.players) {
    		this.setPlayers(options.players);
    	}
    };

    p.setPlayers = function (players) {
    	this.players = players;
    	//setup game starting time, pity points etc
    };

    return Game;
});
