define([
    'flight',
    'handlebars',
    'text!templates/setup.hbs'
],

function (Flight, Handlebars, setupHtml) {

    function Setup() {

        this.template = Handlebars.compile(setupHtml);

        // now initialize the component
        this.after('initialize', function() {
            this.render();
        });

        /**
         * Renders the initial HTML for the setup.
         */
        this.render = function () {
            this.$node.html(this.template());
        };
    }

    return flight.component(Setup);
});
