require.extensions['.html'] = function (module, filename) {
    module.exports = require('fs').readFileSync(filename, 'utf8');
};

module.exports = true;