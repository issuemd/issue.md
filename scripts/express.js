var fs = require('fs'),
    path = require('path'),
    http = require('http'),
    express = require('express'),
    tinylr = require('tiny-lr'),
    nodemon = require('nodemon'),
    marked = require('marked'),
    runAll = require("npm-run-all"),
    BufferStream = require('./lib/buffer-stream.js'),
    session = require('express-session');

require('babel-register');

//

var config = {
    port: 8080,
    host: '0.0.0.0',
    www: ['src/www', 'src/issuemd/plugins'],
    docs: ['docs', 'reports']
};

var app = express();

app.use(session({
  secret: 'keyboard catastrophe',
  resave: false,
  saveUninitialized: true
}));

global.issuemd = requireFresh('../src/issuemd/core.js').default;
requireFresh('../src/issuemd/plugins/issuemd-github.js');
global.Chance = require('../src/lib/chance.js');
global._ = require('lodash');
requireFresh('../src/issuemd/plugins/issuemd-chance.js');

//

app.get('/api/issue/:id', function(req, res) {

    global.issuemd = requireFresh('../src/issuemd/core.js').default;
    requireFresh('../src/issuemd/plugins/issuemd-github.js');
    requireFresh('../src/issuemd/plugins/issuemd-chance.js');

    var out,
        issue = issuemd().chance(1, req.params.id);
    if (req.params.id) {
        issue.id(req.params.id);
    }
    if (req.query.format === 'html') {
        out = issue.html();
    } else if (req.query.format === 'md') {
        out = issue.md();
    } else if (req.query.format === 'summary') {
        out = issue.summary();
    } else if (req.query.format === 'string') {
        out = issue.toString();
    } else {
        out = JSON.stringify(issue);
    }
    res.end(out);

    // var stdout = new BufferStream();

    // runAll('build:issuemd-echo', {
    //     silent: true,
    //     stdout: stdout
    // }).then(results => {
    //     eval(stdout.value);
    //     issuemd = module.exports;
    //     Chance = require('../lib/chance.js');
    //     _ = require('lodash');
    //     eval(fs.readFileSync(__dirname + '/../src/issuemd-plugins/issuemd-chance.js', 'utf8'));
    //     var out,
    //         issue = issuemd().chance(1, req.params.id);
    //     if (req.params.id) {
    //         issue.id(req.params.id);
    //     }
    //     if (req.query.format === 'html') {
    //         out = issue.html();
    //     } else if (req.query.format === 'md') {
    //         out = issue.md();
    //     } else if (req.query.format === 'summary') {
    //         out = issue.summary();
    //     } else if (req.query.format === 'string') {
    //         out = issue.toString();
    //     } else {
    //         out = JSON.stringify(issue);
    //     }
    //     res.end(out);
    // });

});

app.get('/', function(req, res) {
    res.end(fs.readFileSync(path.join(__dirname, '..', 'src', 'www', 'develop.html'), 'utf8'));
});

app.get('/config', require('../src/server/api-middlewares.js'));

app.get('/readme.md', function(req, res) {
    res.end(fs.readFileSync(path.join(__dirname, '..', 'readme.md'), 'utf8'));
});

app.get('/issuemd.min.js', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'issuemd.min.js'));
});

app.get('/issuemd.js', function(req, res) {
    var stdout = new BufferStream();
    runAll('build:issuemd-echo', {
        silent: true,
        stdout: stdout
    }).then(results => {
        res.end(stdout.value);
    });
});

app.get('/app.js', function(req, res) {
    var stdout = new BufferStream();
    runAll('build:app-echo', {
        silent: true,
        stdout: stdout
    }).then(results => {
        res.end(stdout.value);
    });
});

config.www.forEach(function(dir) {
    app.use(express.static(path.join(__dirname, '..', dir)));
});

config.docs.forEach(function(dir) {
    app.use('/' + dir, express.static(path.join(__dirname, '..', dir)));
});

// livereload listen
app.use(tinylr.middleware({ app: app }));

app.listen(config.port, function() {
    console.log('Tune in to ' + config.host + ':' + config.port);
});

// livereload trigger
nodemon({
    watch: [config.www, 'src/issuemd'],
    exec: 'echo',
    ext: 'js json css less sass html'
}).on('restart', function(files) {
    http.get({
        host: config.host,
        port: config.port,
        path: '/changed?files=' + files[0]
    });
});

// https://github.com/JacksonGariety/gulp-nodemon/issues/33#issuecomment-158516435
process.once('SIGINT', function() {
    process.exit(0);
});

//

function requireFresh (src) {
    delete require.cache[require.resolve(src)];
    return require(src);
}