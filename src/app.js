require.extensions['.html'] = function (module, filename) {
    module.exports = require('fs').readFileSync(filename, 'utf8');
};
var requirejs = require('requirejs');


var site = requirejs('site');

site.startSite();
