/* global describe,it,assert */

'use strict'

import * as utils from '../../src/utils.js'

describe('file:utils.js', () => {
  describe('getLastArgument function', () => {
    it('should return last argument when type matches input type', () => {
      assert.equal(utils.getLastArgument([1, 2, 3, { a: 4 }], 'object').a, 4, 'gets last argument when it is an object')
      assert.equal(utils.getLastArgument([1, 2, 3, 'lorem'], 'string'), 'lorem', 'gets last argument when it is an string')
      assert.equal(utils.getLastArgument([1, 2, 3, [4, 5, 6]], 'array')[0], 4, 'gets last argument when it is an array')
    })

    it('should return null when type does not match', () => {
      assert.equal(utils.getLastArgument([1, 2, 3, { a: 4 }], 'string'), null, 'returns null when last argument is object and target is string')
    })

    it('should return specified default when type does not match', () => {
      assert.equal(utils.getLastArgument([1, 2, 3, { a: 4 }], 'string', 5), 5, 'returns defaultValue when last argument is object and target is string')
    })
  })

  describe('defined function', () => {
    it('should return true for items that have a value', () => {
      assert.equal(utils.defined([]), true, 'returns true for array')
      assert.equal(utils.defined({}), true, 'returns true for object')
      assert.equal(utils.defined(''), true, 'returns true for string')
      assert.equal(utils.defined(1), true, 'returns true for number')
      assert.equal(utils.defined(/a/), true, 'returns true for regex')
      assert.equal(utils.defined(function () {}), true, 'returns true for function')
    })

    it('should return false for items that are not defined', () => {
      assert.equal(utils.defined(null), false, 'returns false for null')
      assert.equal(utils.defined(undefined), false, 'returns false for undefined')
      assert.equal(utils.defined(global.undefinedProperty), false, 'returns false for undefined property')
    })
  })

  describe('times function', () => {
    it('should repeat to produce reduced result', () => {
      assert.equal(utils.times(5, (i, result) => {
        return (i + 1) + (result || 0)
      }), 15, 'reduce addition of 1 to 5')
    })
  })

  describe('copy function', () => {
    it('should return new instance of json serialisable object', () => {
      var d = { e: 3 }
      var x = { a: 1, b: 2, c: d }
      var y = x
      assert.equal(x, y, 'direct assignment produces equality')
      assert.equal(x.c, d, 'properties of object are equal to object referred to')
      assert.notEqual(utils.copy(x), x, 'copied object is not equal to original')
      assert.notEqual(utils.copy(x).c, x.c, 'properties are not equal to original')
      assert.equal(JSON.stringify(utils.copy(x)), JSON.stringify(x), 'json strings of copy and original are identical')
    })

    it('should not copy non json serialisable parts of object', () => {
      var x = { a: 1, b: /regex/, c: 3 }
      assert.deepEqual(utils.copy(x), { a: 1, b: {}, c: 3 }, 'swaps regex for empty object - deep')
      assert.notEqual(utils.copy(x), { a: 1, b: {}, c: 3 }, 'swaps regex for empty object - strict')
      var y = { a: 1, b: function () {}, c: 3 }
      assert.deepEqual(utils.copy(y), { a: 1, c: 3 }, 'strips function from results - deep')
      assert.notEqual(utils.copy(y), { a: 1, c: 3 }, 'strips function from results - strict')
    })
  })

  describe('type function', () => {
    it('should return type of input', () => {
      assert.equal(utils.type(1), 'number', 'returns type for number')
      assert.equal(utils.type('lorem'), 'string', 'returns type for string')
      assert.equal(utils.type(/regex/), 'regexp', 'returns type for regex')
    })
  })

  describe('each function', () => {
    it('should run callback for each input', () => {
      var x = [1, 2, 3]
      assert.deepEqual(utils.each(x, (value, index) => { x[index] = x[index] * 2 }), [2, 4, 6], 'loops through array and mutates values')
      var y = { a: 1, b: 2, c: 3 }
      assert.deepEqual(utils.each(y, (value, index) => { y[index] = y[index] * 2 }), { a: 2, b: 4, c: 6 }, 'loops through object and mutates values')
    })

    it('should exit when callback returns false', () => {
      var x = [1, 2, 3]
      utils.each(x, (value, index) => value === 2 ? false : (x[index] = x[index] * 2))
      assert.deepEqual(x, [2, 2, 3], 'stop loop half way through')
      var y = { a: 1, b: 2, c: 3 }
      utils.each(y, (value, index) => value === 2 ? false : (y[index] = y[index] * 2))
      assert.deepEqual(y, { a: 2, b: 2, c: 3 }, 'stop loop half way through')
    })

    it('should handle null inputs', () => {
      assert.equal(utils.each(null), null, 'null in null out')
      assert.equal(utils.each(global.undefinedProperty), null, 'undefined property in null out')
      assert.equal(utils.each(undefined), null, 'undefined property in null out')
    })
  })

  describe('objectKeys function', () => {
    it('should return keys of object', () => {
      assert.deepEqual(utils.objectKeys({ a: 1, b: 2, c: 3 }), ['a', 'b', 'c'], 'returns keys of simple object')
    })
  })

  describe('trim function', () => {
    it('should strip spaces from around string', () => {
      assert.equal(utils.trim('lorem'), 'lorem', 'does not modify when no spaces are around string')
      assert.equal(utils.trim('lorem    '), 'lorem', 'removes trailing spaces')
      assert.equal(utils.trim('    lorem'), 'lorem', 'removes leading spaces')
      assert.equal(utils.trim('    lorem    '), 'lorem', 'removes trailing and leading spaces')
      assert.equal(utils.trim('\t  \tlorem\t  \t'), 'lorem', 'handles tabs')
      assert.equal(utils.trim('    lorem ipsum sit amet    '), 'lorem ipsum sit amet', 'handles multiple words')
      assert.equal(utils.trim('    lorem ipsum\nsit amet    '), 'lorem ipsum\nsit amet', 'handles new lines')
      assert.equal(utils.trim('    lorem ipsum sit amet!    '), 'lorem ipsum sit amet!', 'handles punctuation')
    })
  })

  describe('wordwrap function', () => {
    var text88 = 'Lorem ipsum Fugiat dolore dolore dolor enim aliqua exercitation voluptate qui voluptate.'

    it('should not modify lines shorter than input', () => {
      assert.equal(utils.wordwrap(text88, 100), text88, '88 char line with wrapping set to 100')
    })

    it('should wrap lines at specified length', () => {
      assert.equal(utils.wordwrap(text88, 80), [text88.slice(0, 78), text88.slice(78)].join('\n'), '88 char line with wrapping set to 80')
      assert.equal(utils.wordwrap(text88, 40), [text88.slice(0, 39), text88.slice(39, 78), text88.slice(78)].join('\n'), '88 char line with wrapping set to 40')
    })

    it('should lines at specified length', () => {
      assert.equal(utils.wordwrap(text88, 50), [text88.slice(0, 50), text88.slice(51)].join('\n'), '88 char line with wrapping set to 50')
      assert.equal(utils.wordwrap(text88, 51), [text88.slice(0, 51), text88.slice(51)].join('\n'), '88 char line with wrapping set to 51')
      assert.equal(utils.wordwrap(text88, 88), text88, '88 char line with wrapping set to 88')
    })
  })

  describe('map function', () => {
    it('should map arrays', () => {
      assert.deepEqual(utils.map([1, 2, 3], (value) => value * 2), [2, 4, 6], 'maps an array')
    })

    it('should fail to map empty array with no initial value', () => {
      assert.throws(() => {
        utils.map(null, (value) => value * 2)
      }, 'map called on null or undefined', 'fail to maps an array with null initial value')
      assert.throws(() => {
        utils.map(undefined, (value) => value * 2)
      }, 'map called on null or undefined', 'fail to maps an array with undefined initial value')
      assert.throws(() => {
        utils.map([1, 2, 3], null)
      }, 'null is not a function', 'fail to map an array with null callback')
    })
  })

  describe('reduce function', () => {
    it('should reduce arrays', () => {
      assert.deepEqual(utils.reduce([1, 2, 3], (memo, value) => memo + value), 6, 'reduces an array')
      assert.deepEqual(utils.reduce([1, 2, 3], (memo, value) => {
        return memo + value
      }, 4), 10, 'reduces an array with initial value set')
    })

    it('should fail to reduce empty array with no initial value', () => {
      assert.throws(() => {
        utils.reduce([], (memo, value) => memo + value)
      }, 'Reduce of empty array with no initial value', 'fail to reduces an array with no initial value')
      assert.throws(() => {
        utils.reduce(null, (memo, value) => memo + value)
      }, 'reduce called on null or undefined', 'fail to reduces an array with null initial value')
      assert.throws(() => {
        utils.reduce(undefined, (memo, value) => memo + value)
      }, 'reduce called on null or undefined', 'fail to reduces an array with undefined initial value')
      assert.throws(() => {
        utils.reduce([1, 2, 3], null)
      }, 'null is not a function', 'fail to reduces an array with null callback')
    })
  })
})
