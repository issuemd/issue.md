'use strict';

module.exports = (function() {

    var packageJson = require('./package.json');

    return [
        function(req, res, next) {
            if (req.headers['content-type'] === 'application/json') {
                res.setHeader('content-type', 'application/json');
                res.end(JSON.stringify({
                    package: packageJson,
                    serverURI: process.env.NOW_URL || '/'
                }));
            } else {
                next();
            }
        }
    ];

})();
