'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
    let app = new EmberApp(defaults, {
        // Add options here
        'ember-bootstrap': {
            'bootstrapVersion': 3,
            'importBootstrapFont': true,
            'importBootstrapCSS': false
        },
        'sassOptions': {
            includePaths: [
                'node_modules/bootstrap-sass/assets/stylesheets'
            ]
        },
        'babel': {
            sourceMaps: 'inline'
        }
    });

    return app.toTree();
};