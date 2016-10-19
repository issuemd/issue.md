var app = require('express')(),
    package_json = require('./package.json'),
    cors = require('cors');

var corsMiddleware = cors({
    origin: function(origin, callback) {
        callback(null, package_json.clients.indexOf(origin) !== -1);
    }
});

app.options('*', corsMiddleware);
app.use(corsMiddleware);

require('./api-middlewares.js').forEach(function(middleware) {
    app.use(middleware);
});

app.listen(8081, '0.0.0.0');
