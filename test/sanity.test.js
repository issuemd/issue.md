/* global describe test expect */

'use strict'

describe('sanity: check test environment executes javascript correctly', () => {
  describe('should do simple maths', () => {
    test('sum 1 to 3', () => expect(1 + 2 + 3).toBe(6))
    test('add booleans (it is javascript after all)', () => expect(true + true).toBe(2))
  })
  describe('should handle arrow es2015 functions', () => {
    var arr = [1, 2, 3, 4, 5]
    test('reduce and arrow functions work as expected', () => expect(arr.reduce((a, b) => a + b)).toBe(15))
  })
})
