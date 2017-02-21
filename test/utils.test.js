/* global describe test expect */

'use strict'

import * as utils from '../components/utils.js'

describe('file:utils.js', () => {
  describe('getLastArgument function', () => {
    describe('should return last argument when type matches input type', () => {
      test('gets last argument when it is an object', () => expect(utils.getLastArgument([1, 2, 3, { a: 4 }], 'object').a).toBe(4))
      test('gets last argument when it is an string', () => expect(utils.getLastArgument([1, 2, 3, 'lorem'], 'string')).toBe('lorem'))
      test('gets last argument when it is an array', () => expect(utils.getLastArgument([1, 2, 3, [4, 5, 6]], 'array')[0]).toBe(4))
    })

    describe('should return null when type does not match', () => {
      test('returns null when last argument is object and target is string', () => expect(utils.getLastArgument([1, 2, 3, { a: 4 }], 'string')).toBe(null))
    })

    describe('should return specified default when type does not match', () => {
      test('returns defaultValue when last argument is object and target is string', () => expect(utils.getLastArgument([1, 2, 3, { a: 4 }], 'string', 5)).toBe(5))
    })
  })

  describe('defined function', () => {
    describe('should return true for items that have a value', () => {
      test('returns true for array', () => expect(utils.defined([])).toBe(true))
      test('returns true for object', () => expect(utils.defined({})).toBe(true))
      test('returns true for string', () => expect(utils.defined('')).toBe(true))
      test('returns true for number', () => expect(utils.defined(1)).toBe(true))
      test('returns true for regex', () => expect(utils.defined(/a/)).toBe(true))
      test('returns true for function', () => expect(utils.defined(function () {})).toBe(true))
    })

    describe('should return false for items that are not defined', () => {
      test('returns false for null', () => expect(utils.defined(null)).toBe(false))
      test('returns false for undefined', () => expect(utils.defined(undefined)).toBe(false))
      test('returns false for undefined property', () => expect(utils.defined(global.undefinedProperty)).toBe(false))
    })
  })

  describe('times function', () => {
    describe('should repeat to produce reduced result', () => {
      test('reduce addition of 1 to 5', () => {
        expect(utils.times(5, (i, result) => {
          return (i + 1) + (result || 0)
        })).toBe(15)
      })
    })
  })

  describe('copy function', () => {
    describe('should return new instance of json serialisable object', () => {
      var d = { e: 3 }
      var x = { a: 1, b: 2, c: d }
      var y = x
      test('direct assignment produces equality', () => expect(x).toBe(y))
      test('properties of object are equal to object referred to', () => expect(x.c).toBe(d))
      test('copied object is not equal to original', () => expect(utils.copy(x)).not.toBe(x))
      test('properties are not equal to original', () => expect(utils.copy(x).c).not.toBe(x.c))
      test('json strings of copy and original are identical', () => expect(JSON.stringify(utils.copy(x))).toBe(JSON.stringify(x)))
    })

    describe('should not copy non json serialisable parts of object', () => {
      var x = { a: 1, b: /regex/, c: 3 }
      test('swaps regex for empty object - deep', () => expect(utils.copy(x)).toEqual({ a: 1, b: {}, c: 3 }))
      test('swaps regex for empty object - strict', () => expect(utils.copy(x)).not.toBe({ a: 1, b: {}, c: 3 }))
      var y = { a: 1, b: function () {}, c: 3 }
      test('strips function from results - deep', () => expect(utils.copy(y)).toEqual({ a: 1, c: 3 }))
      test('strips function from results - strict', () => expect(utils.copy(y)).not.toBe({ a: 1, c: 3 }))
    })
  })

  describe('type function', () => {
    describe('should return type of input', () => {
      test('returns type for number', () => expect(utils.type(1)).toBe('number'))
      test('returns type for string', () => expect(utils.type('lorem')).toBe('string'))
      test('returns type for regex', () => expect(utils.type(/regex/)).toBe('regexp'))
    })
  })

  describe('each function', () => {
    describe('should run callback for each input', () => {
      var x = [1, 2, 3]
      test('loops through array and mutates values', () => expect(utils.each(x, (value, index) => { x[index] = x[index] * 2 })).toEqual([2, 4, 6]))
      var y = { a: 1, b: 2, c: 3 }
      test('loops through object and mutates values', () => expect(utils.each(y, (value, index) => { y[index] = y[index] * 2 })).toEqual({ a: 2, b: 4, c: 6 }))
    })

    describe('should exit when callback returns false', () => {
      var x = [1, 2, 3]
      utils.each(x, (value, index) => value === 2 ? false : (x[index] = x[index] * 2))
      test('stop loop half way through', () => expect(x).toEqual([2, 2, 3]))
      var y = { a: 1, b: 2, c: 3 }
      utils.each(y, (value, index) => value === 2 ? false : (y[index] = y[index] * 2))
      test('stop loop half way through', () => expect(y).toEqual({ a: 2, b: 2, c: 3 }))
    })

    describe('should handle null inputs', () => {
      test('null in null out', () => expect(utils.each(null)).toBe(null))
      test('undefined property in undefined out', () => expect(utils.each(global.undefinedProperty)).toBe(undefined))
      test('undefined property in undefined out', () => expect(utils.each(undefined)).toBe(undefined))
    })
  })

  describe('objectKeys function', () => {
    describe('should return keys of object', () => {
      test('returns keys of simple object', () => expect(utils.objectKeys({ a: 1, b: 2, c: 3 })).toEqual(['a', 'b', 'c']))
    })
  })

  describe('trim function', () => {
    describe('should strip spaces from around string', () => {
      test('does not modify when no spaces are around string', () => expect(utils.trim('lorem')).toBe('lorem'))
      test('removes trailing spaces', () => expect(utils.trim('lorem    ')).toBe('lorem'))
      test('removes leading spaces', () => expect(utils.trim('    lorem')).toBe('lorem'))
      test('removes trailing and leading spaces', () => expect(utils.trim('    lorem    ')).toBe('lorem'))
      test('handles tabs', () => expect(utils.trim('\t  \tlorem\t  \t')).toBe('lorem'))
      test('handles multiple words', () => expect(utils.trim('    lorem ipsum sit amet    ')).toBe('lorem ipsum sit amet'))
      test('handles new lines', () => expect(utils.trim('    lorem ipsum\nsit amet    ')).toBe('lorem ipsum\nsit amet'))
      test('handles punctuation', () => expect(utils.trim('    lorem ipsum sit amet!    ')).toBe('lorem ipsum sit amet!'))
    })
  })

  describe('wordwrap function', () => {
    var text88 = 'Lorem ipsum Fugiat dolore dolore dolor enim aliqua exercitation voluptate qui voluptate.'

    describe('should not modify lines shorter than input', () => {
      test('88 char line with wrapping set to 100', () => expect(utils.wordwrap(text88, 100)).toBe(text88))
    })

    describe('should wrap lines at specified length', () => {
      test('88 char line with wrapping set to 80', () => expect(utils.wordwrap(text88, 80)).toBe([text88.slice(0, 78), text88.slice(78)].join('\n')))
      test('88 char line with wrapping set to 40', () => expect(utils.wordwrap(text88, 40)).toBe([text88.slice(0, 39), text88.slice(39, 78), text88.slice(78)].join('\n')))
    })

    describe('should lines at specified length', () => {
      test('88 char line with wrapping set to 50', () => expect(utils.wordwrap(text88, 50)).toBe([text88.slice(0, 50), text88.slice(51)].join('\n')))
      test('88 char line with wrapping set to 51', () => expect(utils.wordwrap(text88, 51)).toBe([text88.slice(0, 51), text88.slice(51)].join('\n')))
      test('88 char line with wrapping set to 88', () => expect(utils.wordwrap(text88, 88)).toBe(text88))
    })
  })

  describe('map function', () => {
    describe('should map arrays', () => {
      test('maps an array', () => expect(utils.map([1, 2, 3], (value) => value * 2)).toEqual([2, 4, 6]))
    })

    describe('should fail to map empty array with no initial value', () => {
      test('fail to maps an array with null initial value', () => {
        expect(() => {
          utils.map(null, (value) => value * 2)
        }).toThrow('map called on null or undefined')
      })
      test('fail to maps an array with undefined initial value', () => {
        expect(() => {
          utils.map(undefined, (value) => value * 2)
        }).toThrow('map called on null or undefined')
      })
      test('fail to map an array with null callback', () => {
        expect(() => {
          utils.map([1, 2, 3], null)
        }).toThrow('null is not a function')
      })
    })
  })

  describe('reduce function', () => {
    describe('should reduce arrays', () => {
      test('reduces an array', () => expect(utils.reduce([1, 2, 3], (memo, value) => memo + value)).toBe(6))
      test('reduces an array with initial value set', () => {
        expect(utils.reduce([1, 2, 3], (memo, value) => {
          return memo + value
        }, 4)).toBe(10)
      })
    })

    describe('should fail to reduce empty array with no initial value', () => {
      test('fail to reduces an array with no initial value', () => {
        expect(() => {
          utils.reduce([], (memo, value) => memo + value)
        }).toThrow('Reduce of empty array with no initial value')
      })

      test('fail to reduces an array with null initial value', () => {
        expect(() => {
          utils.reduce(null, (memo, value) => memo + value)
        }).toThrow('reduce called on null or undefined')
      })

      test('fail to reduces an array with undefined initial value', () => {
        expect(() => {
          utils.reduce(undefined, (memo, value) => memo + value)
        }).toThrow('reduce called on null or undefined')
      })

      test('fail to reduces an array with null callback', () => {
        expect(() => {
          utils.reduce([1, 2, 3], null)
        }).toThrow('null is not a function')
      })
    })
  })
})
