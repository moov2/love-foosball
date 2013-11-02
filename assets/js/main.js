require([
    'jquery',
    'ui/setup',
    'ui/match',
    'ui/results'
],

function ($, Setup, Match, Results) {

    var ROOT_SELECTOR = '.js-app';

    // lets start with the game setup.
    Setup.attachTo(ROOT_SELECTOR);

    $(document).on('setup:startMatch', function (e, data) {
        Match.attachTo(ROOT_SELECTOR, {
        	players: data.players
        });
    });

    $(document).on('match:complete', function (e, data) {
        console.log(data);

        Match.teardownAll();
        Results.attachTo(ROOT_SELECTOR, {
            game: data
        });
    });
});
