var fs = require('fs-extra'),
    path = require('path');

var packageJson = require('../package.json');

for (i in packageJson.dependencies) {
    var localPackageJson = require(i + '/package.json'),
        sourceFile = path.resolve(path.join('node_modules', i, localPackageJson.main)),
        targetFile = path.join('src', 'lib', path.basename(sourceFile)),
        libWrapperTemplate = `
        /* istanbul ignore next */
        var mymodule = function() {
            var exports = {},
                module = { exports: exports };
            /* beautify preserve:start */
            ${fs.readFileSync(sourceFile, 'utf8')}
            /* beautify preserve:end */
            return module.exports;
        }();
        export default mymodule`;

    fs.outputFileSync(targetFile, libWrapperTemplate)

}
