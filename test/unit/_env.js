'use strict';

var fs = require('fs');

// define globals accessible in all tests
global.assert = require('chai').assert;
global.sinon = require('sinon');

global.loadFixture = filename => {
    return fs.readFileSync(__dirname + '/../fixtures/' + filename, 'utf8');
};
