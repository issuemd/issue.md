module.exports = {
    package: JSON.parse(require('fs').readFileSync(__dirname + '/../../package.json')),
    serverURI: require('fs').readFileSync(__dirname + '/../../SERVER_URI', 'utf8')
};