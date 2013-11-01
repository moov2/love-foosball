define([
	'flight'
],
function (Flight) {

	function Timer () {

        this.after('initialize', function() {
            this.render();
        });

        /**
         * Renders the timer.
         */
        this.render = function () {

        };
	}

	return flight.component(Timer);
});
