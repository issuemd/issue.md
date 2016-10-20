module.exports = {
    package: JSON.parse(require('fs').readFileSync(__dirname + '/../../package.json')),
    serverURI: '/'
};