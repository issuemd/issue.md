module.exports = (function() {

    var package_json = require('./package.json');

    return [
        function(req, res, next) {
            if (req.headers['content-type'] === 'application/json') {
                res.setHeader('content-type', 'application/json');
                res.end(JSON.stringify({
                    version: package_json.version,
                    server_uri: process.env.NOW_URL || '/'
                }));
            } else {
                next();
            }
        }
    ]

})();
