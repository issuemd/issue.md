!function() {

    var argv = require('minimist')(process.argv.slice(2)),
        budo = require('budo'),
        middleware = require('./server/api-middlewares.js');

    budo('client/app.js', {
        dir: 'client',
        live: true,
        port: argv.port || argv.p || 8080,
        host: '0.0.0.0',
        debug: false,
        middleware: middleware,
        browserifyArgs: ('-t rollupify -t bubleify -t [ redirectify --suffix .dev ] -t brfs').split(' ')
    }).on('connect', function(ev) {
        console.log('listening to: ' + ev.uri);
    })

}();
