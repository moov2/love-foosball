define([
	'flight',
	'handlebars',
	'ui/timer',
	'ui/scoreboard',
    'domain/game',
	'text!templates/match.hbs'
],

function (Flight, Handlebars, Timer, Scoreboard, Game, matchHtml) {

	var TIMER_SELECTOR = '.js-timer',
		SCOREBOARD_SELECTOR = '.js-scoreboard';

	function Match() {

		this.template = Handlebars.compile(matchHtml);

        this.after('initialize', function() {
            this.currentGame = new Game({ players: this.attr.players });

            this.render();

            this.setupTimer();

            this.setupScoreboard();
        });

        this.render = function () {
        	this.$node.html(this.template());
        };

        this.setupTimer = function () {
        	Timer.attachTo(TIMER_SELECTOR, {
                game: this.currentGame
            });
        };

        this.setupScoreboard = function () {
        	Scoreboard.attachTo(SCOREBOARD_SELECTOR, {
                game: this.currentGame
            });
        };
	}
	
	return flight.component(Match);
});