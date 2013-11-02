require.config({

    deps: [ 'main' ],

    paths: {
        jquery: 'vendor/jquery',
        flight: 'vendor/flight',
        handlebars: 'vendor/handlebars',
        text: 'vendor/text',
        underscore: 'vendor/underscore'
    },

    shim: {
        'handlebars': {
            exports: 'Handlebars'
        },
        'flight': {
            deps: ['jquery'],
            exports: 'flight'
        },
        'underscore': {
            exports: '_'
        }
    }

});
