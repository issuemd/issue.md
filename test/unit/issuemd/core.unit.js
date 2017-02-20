/* global describe,it,assert */

'use strict'

import issuemd from '../../../components/issuemd/core.js'

describe('file:issuemd/core.js', () => {
  describe('issuemd core initialises', () => {
    it('should be defined as function', () => {
      assert.equal(typeof issuemd, 'function', 'issuemd is function')
    })
    it('should be callable', () => {
      assert.equal(typeof issuemd(), 'object', 'calling issuemd without params returns empty object')
    })
  })

  describe('displays inline docs for plugins/extensions', () => {
    it('should display inline documentation', () => {
      assert.equal(issuemd({}).created.usage().slice(0, 10), '## created', 'display inline documentation for demo extension')
    })
    it('should display empty string when there is no documentation', () => {
      assert.equal(issuemd({}).main.usage(), '', 'display no documentation for main function')
    })
  })
})
