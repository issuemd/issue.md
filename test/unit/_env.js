'use strict'

var fs = require('fs')
var path = require('path')

// define globals accessible in all tests
global.assert = require('chai').assert
global.sinon = require('sinon')

global.loadFixture = filename => {
  return fs.readFileSync(path.join(__dirname, '..', 'fixtures', filename), 'utf8')
}
