define([
	'flight',
	'handlebars',
	'ui/timer',
	'ui/state',
	'text!templates/match.hbs'
],

function (Flight, Handlebars, Timer, State, matchHtml) {

	var TIMER_SELECTOR = '.js-timer',
		STATE_SELECTOR = '.js-state';

	function Match() {

		this.template = Handlebars.compile(matchHtml);

        this.after('initialize', function() {
            this.render();

            this.setupTimer();

            this.setupState();
        });

        this.render = function () {
        	this.$node.html(this.template());
        };

        this.setupTimer = function () {
        	Timer.attachTo(TIMER_SELECTOR);
        };

        this.setupState = function () {
        	State.attachTo(STATE_SELECTOR, {
                players: this.attr.players
            });
        };
	}
	
	return flight.component(Match);
});