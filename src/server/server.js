/* global issuemd */

'use strict';

var app = require('express')(),
    packageJson = require('../package.json'),
    cors = require('cors'),
    session = require('express-session');

require('babel-register');

global.issuemd = require('../issuemd/core.js').default;

var corsMiddleware = cors({
    origin: function(origin, callback) {
        callback(null, packageJson.clients.indexOf(origin) !== -1);
    }
});

app.options('*', corsMiddleware);
app.use(corsMiddleware);

app.use(session({
  secret: 'keyboard catastrophe',
  resave: false,
  saveUninitialized: true
}));

require('./api-middlewares.js').forEach(function(middleware) {
    app.use(middleware);
});

app.use(function(req, res) {
    var issues = issuemd({ original: { title: 'go go', created: '2014', creator: 'Billy Moon', body: 'super duper' }, updates: [] });
    res.end(issues.md());
});

app.listen(8081, '0.0.0.0');