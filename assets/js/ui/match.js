define([
	'flight',
	'handlebars',
	'ui/timer',
	'ui/state',
    'domain/match',
	'text!templates/match.hbs'
],

function (Flight, Handlebars, Timer, State, MatchData, matchHtml) {

	var TIMER_SELECTOR = '.js-timer',
		STATE_SELECTOR = '.js-state';

	function Match() {

		this.template = Handlebars.compile(matchHtml);

        this.after('initialize', function() {
            MatchData.setPlayers(this.attr.players);

            this.render();

            this.setupTimer();

            this.setupState();
        });

        this.render = function () {
        	this.$node.html(this.template());
        };

        this.setupTimer = function () {
        	Timer.attachTo(TIMER_SELECTOR, {
                matchData: MatchData
            });
        };

        this.setupState = function () {
        	State.attachTo(STATE_SELECTOR, {
                matchData: MatchData
            });
        };
	}
	
	return flight.component(Match);
});