/* global describe test expect */

'use strict'

import config from '../../components/issuemd/config.js'

describe('file:issuemd/config.js', () => {
  describe('issuemd config', () => {
    test('should have version string defined', () => {
      expect(typeof config.version).toBe('string')
    })
  })
})
