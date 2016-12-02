import { createFilter } from 'rollup-pluginutils'

var fs = require('fs')
var path = require('path')
var packageJson = require('../package.json')

export default {
  plugins: [loadfile()]
}

function loadfile () {
  const filter = createFilter('*.json')

  return {
    name: 'loadfile',
    transform (code, id) {
      if (path.relative(__dirname, id) === '../src/www/config.json') {
        var config = JSON.parse(code)
        if (process.env.PROD) {
          config.serverURI = fs.readFileSync(path.join(__dirname, '..', 'SERVER_URI'), 'utf8')
        } else {
          config.env = 'DEV'
          config.serverURI = '/'
          config.package = packageJson
        }
        config.version = packageJson.version
        return {
          code: `export default ${JSON.stringify(config)};`,
          map: { mappings: '' }
        }
      } else if (filter(id)) {
        return {
          code: `export default ${code};`,
          map: { mappings: '' }
        }
      }
    }
  }
}

