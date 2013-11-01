require([
    'jquery',
    'ui/setup'
],

function ($, Setup) {

    var ROOT_SELECTOR = '.js-app';

    // this is the entry point...

    Setup.attachTo(ROOT_SELECTOR);

});
