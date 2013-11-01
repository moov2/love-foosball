require([
    'jquery',
    'ui/setup',
    'ui/match'
],

function ($, Setup, Match) {

    var ROOT_SELECTOR = '.js-app';

    // lets start with the game setup.
    Setup.attachTo(ROOT_SELECTOR);


    $(document).on('setup:startMatch', function (e, data) {
        Match.attachTo(ROOT_SELECTOR, {
        	players: data.players
        });
    });
});
