module.exports = {
    package: JSON.parse(require('fs').readFileSync(__dirname + '/../../package.json')),
    server_uri: require('fs').readFileSync(__dirname + '/../../SERVER_URI', 'utf8')
}