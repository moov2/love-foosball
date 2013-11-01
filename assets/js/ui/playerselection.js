define([
    'flight',
    'handlebars',
    'text!data/players.json',
    'text!templates/playerselection.hbs'
],

function (Flight, Handlebars, playersJson, playerSelectionHtml) {

    /**
     * CSS class for indicating a currently selected player.
     */
    var CSS_SELECTED = 'selected';

    function PlayerSelection() {

        this.template = Handlebars.compile(playerSelectionHtml);

        this.defaultAttrs({
            playerList: '.js-player-list',
            playerListItem: '.js-player-list > li'
        });

        this.before('initialize', function () {
            this.getPlayers();
        });

        this.after('initialize', function() {
            this.render();

            this.triggerChange();

            this.on('click', { 'playerListItem': this.togglePlayerSelection });
        });

        /**
         * Gets the players that can be selected.
         */
        this.getPlayers = function () {
            this.availablePlayers = JSON.parse(playersJson);

            /**
             * By default all the players are selected, line below clones the
             * available players array.
             */
            this.selectedPlayers = this.availablePlayers.slice(0);
        };

        /**
         * Renders the list of players to be selected by the user.
         */
        this.render = function () {
            this.$node.html(this.template({ players: this.availablePlayers}));
        };

        /**
         * Toggles the selected state of the player.
         */
        this.togglePlayerSelection = function (e) {
            var $player = (e.target.nodeName === 'IMG') ? $(e.target).parent() : $(e.target) ;
            var player = this.availablePlayers[$player.index()];

            if ($player.hasClass(CSS_SELECTED)) {
                $player.removeClass(CSS_SELECTED);
                this.selectedPlayers.splice(this.selectedPlayers.indexOf(player), 1);
            } else {
                $player.addClass(CSS_SELECTED);
                this.selectedPlayers.push(player);
            }

            this.triggerChange();
        };

        /**
         * Dispatches player selection change event.
         */
        this.triggerChange = function () {
            this.trigger('playerselection:change', { selectedPlayers: this.selectedPlayers });
        };
    }

    return flight.component(PlayerSelection);
});
