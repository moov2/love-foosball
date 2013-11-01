define([],

/**
 * Module keeps track of the current match in progress.
 */
function () {

    function Match () {
        this.players = [];
    }

    var p = Match.prototype = {};

    return new Match();
});
