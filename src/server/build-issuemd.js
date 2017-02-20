var path = require('path')
var rollup = require('rollup')

var cache

// let built

module.exports = () => {
  // if (built) {
  //   res.end(built)
  // } else {
    // console.log('rolling')
  return rollup.rollup({
    entry: path.join(__dirname, '..', 'issuemd', 'core.js'),
    cache: cache
  }).then(function (bundle) {
    var result = bundle.generate({
      format: 'iife',
      moduleName: 'issuemd'
    })
    cache = bundle
    // built = result.code
    return result.code
    // bundle.write({
    //   format: 'cjs',
    //   dest: 'bundle.js'
    // });
  })
  // }
}
