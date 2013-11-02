define([
    'flight',
    'underscore',
    'handlebars',
    'text!templates/results.hbs'
],

function (Flight, _, Handlebars, resultsHtml) {

    function Results () {
        this.template = Handlebars.compile(resultsHtml);

        this.after('initialize', function() {
            this.orderPlayers();
            this.render();
        });

        /**
         * Get the players in score order.
         */
        this.orderPlayers = function () {
            this.players = _.sortBy(this.attr.game.players, function (player) { return player.score }).reverse();
        };

        /**
         * Renders the results of the game.
         */
        this.render = function () {
            this.$node.html(this.template({ players: this.players }));
        };
    }

    return Flight.component(Results);
});
