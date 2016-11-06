'use strict';

module.exports = (function() {

    var packageJson = require('../package.json');

    return [
        function(req, res, next) {

            if (req.headers['content-type'] === 'application/json') {
                res.setHeader('content-type', 'application/json');
                res.end(JSON.stringify({
                    version: packageJson.version,
                    serverURI: process.env.NOW_URL || '/'
                }));
            } else {
                next();
            }
        },
        function(req, res, next) {
            var sess = req.session
            if (sess.views) {
                sess.views++;
                res.setHeader('Content-Type', 'text/html');
                res.write('<p>views: ' + sess.views + '</p>');
                res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>');
                res.end();
            } else {
                sess.views = 1;
                res.end('welcome to the session demo. refresh!');
            }
        }
    ];

})();
