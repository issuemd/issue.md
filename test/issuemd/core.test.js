/* global describe test expect */
'use strict'

import issuemd from '../../components/issuemd/core.js'

describe('file:issuemd/core.js', () => {
  describe('issuemd core initialises', () => {
    test('should be defined as function', () => { // 'issuemd is function'
      expect(typeof issuemd).toBe('function')
    })
    test('should be callable', () => { // 'calling issuemd without params returns empty object'
      expect(typeof issuemd()).toBe('object')
    })
  })

  describe('displays inline docs for plugins/extensions', () => {
    test('should display inline documentation', () => { // 'display inline documentation for demo extension'
      expect(issuemd({}).created.usage().slice(0, 10)).toBe('## created')
    })
    test('should display empty string when there is no documentation', () => { // 'display no documentation for main function'
      expect(issuemd({}).main.usage()).toBe('')
    })
  })
})
