module.exports = {
    package: JSON.parse(require('fs').readFileSync(__dirname + '/../../package.json')),
    server_uri: '/'
}