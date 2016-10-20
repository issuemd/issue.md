'use strict';

var app = require('express')(),
    packageJson = require('./package.json'),
    cors = require('cors');

var corsMiddleware = cors({
    origin: function(origin, callback) {
        callback(null, packageJson.clients.indexOf(origin) !== -1);
    }
});

app.options('*', corsMiddleware);
app.use(corsMiddleware);

require('./api-middlewares.js').forEach(function(middleware) {
    app.use(middleware);
});

app.listen(8081, '0.0.0.0');
