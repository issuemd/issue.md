module.exports = (function() {

    var package_json = require('./package.json');

    return [
        function(req, res, next) {
            package_json.clients.some(function(client) {
                if(req.headers.origin === client) {
                    res.setHeader('Access-Control-Allow-Origin', client);
                    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                    return true;
                }
            });
            next();
        },
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
