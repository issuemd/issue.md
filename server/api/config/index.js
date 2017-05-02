const { send } = require('micro')

const packageJson = require('../../../package.json')

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  send(res, 200, JSON.stringify({
    version: packageJson.version
  }))
}
