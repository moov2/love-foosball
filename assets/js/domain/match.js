define([],

/**
 * Module keeps track of the current match in progress.
 */
function () {

    function Match () {
        this.players = [];
    }

    var p = Match.prototype = {};

    p.setPlayers = function (players) {
    	this.players = players;
    	//setup match starting time, pity points etc
    };

    return new Match();
});
