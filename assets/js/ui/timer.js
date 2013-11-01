define([
	'flight',
    'handlebars',
    'text!templates/timer.hbs'
],
function (Flight, Handlebars, timerHtml) {

        /**
         * CSS classes to apply when the timer is paused.
         */
    var CSS_PAUSE = 'text-rose-dark';

	function Timer () {

        this.template = Handlebars.compile(timerHtml);

        this.after('initialize', function() {
            this.render();

            this.on('click', this.clicked);

            this.begin();
        });

        /**
         * Begins the countdown.
         */
        this.begin = function () {
            var self = this;

            this.$node.removeClass(CSS_PAUSE);

            this.interval = window.setInterval(function () {
                self.attr.game.duration--;
                self.render();

                if (self.attr.game.duration <= 0) {
                    self.complete();
                    self.pause();
                }
            }, 1000);
        };

        /**
         * Dependant on if the timer is currently running, it will either pause
         * or resume.
         */
        this.clicked = function () {
            if (!this.interval) {
                this.begin();
                return;
            }

            this.pause();
        };

        /**
         * Game has completed.
         */
        this.complete = function () {
            this.trigger('timer:complete');
        };

        /**
         * Adds a leading zero onto the value if it is a single digit.
         */
        this.doubleZero = function (value) {
            return (value < 10) ? '0' + value.toString() : value.toString();
        };

        /**
         * Pauses the countdown timer.
         */
        this.pause = function () {
            window.clearInterval(this.interval);
            this.interval = undefined;

            this.$node.addClass(CSS_PAUSE);
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
