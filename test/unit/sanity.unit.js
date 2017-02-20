/* global describe,it,assert */

'use strict'

describe('sanity: check test environment works as expected', () => {
  describe('environment executes javascript correctly', () => {
    it('should do simple maths', () => {
      assert.equal(1 + 2 + 3, 6, 'sum 1 to 3')
      assert.equal(true + true, 2, 'add booleans (it is javascript after all)')
    })

    it('should handle arrow es2015 functions', () => {
      var arr = [1, 2, 3, 4, 5]
      assert.equal(arr.reduce((a, b) => a + b), 15, 'reduce and arrow functions work as expected')
    })
  })
})
