var fs = require('fs-extra')
var path = require('path')

var packageJson = require('../package.json')

for (var i in packageJson.dependencies) {
  var localPackageJson = require(i + '/package.json')
  var sourceFile = path.resolve(path.join('node_modules', i, localPackageJson.main))
  var targetFile = path.join('src', 'lib', path.basename(sourceFile))
  var libWrapperTemplate = `
/* eslint-disable */
/* istanbul ignore next */
var mymodule = function() {
    var exports = {},
        module = { exports: exports };
    /* beautify preserve:start */
    ${fs.readFileSync(sourceFile, 'utf8')}
    /* beautify preserve:end */
    return module.exports;
}();
export default mymodule
`

  fs.outputFileSync(targetFile, libWrapperTemplate)
}
