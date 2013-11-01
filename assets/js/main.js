require([
    'jquery',
    'ui/setup'
],

function ($, Setup) {

    var ROOT_SELECTOR = '.js-app';

    // lets start with the game setup.
    Setup.attachTo(ROOT_SELECTOR);


    $(document).on('setup:startMatch', function (e, data) {

        // begin match...
    });
});
