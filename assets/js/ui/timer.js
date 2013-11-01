define([
	'flight',
    'handlebars',
    'text!templates/timer.hbs'
],
function (Flight, Handlebars, timerHtml) {

	function Timer () {

        this.template = Handlebars.compile(timerHtml);

        this.after('initialize', function() {
            this.render();

            this.begin();
        });

        /**
         * Begins the countdown.
         */
        this.begin = function () {
            var self = this;

            this.interval = window.setInterval(function () {
                self.attr.game.duration--;
                self.render();

                if (self.attr.game.duration <= 0) {
                    self.complete();
                    window.clearInterval(self.interval);
                }
            }, 1000);
        };

        /**
         * Game has completed.
         */
        this.complete = function () {
            console.log('completed');
        };

        /**
         * Adds a leading zero onto the value if it is a single digit.
         */
        this.doubleZero = function (value) {
            return (value < 10) ? '0' + value.toString() : value.toString();
        };

        /**
         * Renders the timer.
         */
        this.render = function () {
            this.$node.html(this.template({ timeLeft: this.timeLeft() }));
        };

        /**
         * Returns human readable form of the time left.
         */
        this.timeLeft = function () {
            return Math.floor(this.attr.game.duration / 60) + ':' + this.doubleZero(this.attr.game.duration % 60);
        };
	}

	return flight.component(Timer);
});
