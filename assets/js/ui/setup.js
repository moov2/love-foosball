define([
    'flight',
    'handlebars',
    'ui/playerselection',
    'text!templates/setup.hbs'
],

function (Flight, Handlebars, PlayerSelection, setupHtml) {

        /**
         * Selector for the player selection component.
         */
    var PLAYER_SELECTION_SELECTOR = '.js-player-selection';

    function Setup() {

        this.template = Handlebars.compile(setupHtml);

        this.defaultAttrs({
            startBtn: '.js-start-btn'
        });

        // now initialize the component
        this.after('initialize', function() {
            this.on(document, 'playerselection:change', this.updatedSelectedPlayers);

            this.render();

            this.on('click', { 'startBtn': this.startMatch });
        });

        /**
         * Renders the initial HTML for the setup.
         */
        this.render = function () {
            this.$node.html(this.template());

            this.setupPlayerSelection();
        };

        /**
         * Initializes the setup player selection component.
         */
        this.setupPlayerSelection = function () {
            PlayerSelection.attachTo(PLAYER_SELECTION_SELECTOR);
        };

        /**
         * Dispatches event notifying that the match should start.
         */
        this.startMatch = function () {
            if (!this.validate()) {
                return;
            }

            this.teardown();
            this.$node.empty();

            PlayerSelection.teardownAll();

            this.trigger('setup:startMatch', { players: this.players });
        };

        /**
         * Validates that the match is ready to be played.
         *
         * Requirements:
         *
         * - Must have at least 2 players.
         */
        this.updatedSelectedPlayers = function (ev, data) {
            this.players = data.selectedPlayers;

            if (!this.validate()) {
                this.select('startBtn').attr('disabled', 'disabled');
            } else {
                this.select('startBtn').removeAttr('disabled');
            }
        };

        /**
         * Validates that the game is ready to start.
         */
        this.validate = function () {
            return this.players.length >= 2;
        };
    }

    return flight.component(Setup);
});
