module.exports = {
    server_uri: require('fs').readFileSync(__dirname + '/../SERVER_URI', 'utf8')
}