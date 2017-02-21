/* global describe test expect */

'use strict'

import * as helpers from '../../components/issuemd/helpers.js'

describe('file:issuemd/helpers.js', () => {
  describe('hash calculates correctly', () => {
    test('should generate hash', () => {
      expect(helpers.hash('Some Guy @ 2013-02-04')).toBe('2a924eeb2bb1753109a8f2a3566a15a9')
    })
  })

  describe('compose signature from parts', () => {
    test('should compose signature for given inputs', () => {
      expect(helpers.composeSignature('Some Guy', '2013-02-04')).toBe('Some Guy @ 2013-02-04')
    })
  })

  describe('dateString function', () => {
    test('return date string with +0000 instead of Z for timezone offset', () => {
      expect(helpers.dateString(new Date('2012-02-01'))).toBe('2012-02-01T00:00:00.000+0000')
    })
  })

  describe('issueJsonToLoose function', () => {
    test('should return json data structure for issue', () => {
      expect(helpers.issueJsonToLoose({
        original: {
          title: '',
          creator: '',
          created: '2016-10-13T21:03:29.711+0000',
          meta: [{
            key: 'priority',
            value: 'high'
          }],
          body: ''
        },
        updates: [{
          modified: '2016-10-13T22:03:23.711+0000',
          meta: [{
            key: 'priority',
            value: 'medium'
          }]
        }]
      })).toEqual({ body: '', created: '2016-10-13T21:03:29.711+0000', creator: '', priority: 'medium', title: '' })
    })
  })

  describe('looseJsonToIssueJson function', () => {
    test('should return data structure for issue', () => {
      expect(helpers.looseJsonToIssueJson({
        created: '2016-10-13T21:03:29.711+0000'
      })).toEqual({
        original: {
          title: '',
          creator: '',
          created: '2016-10-13T21:03:29.711+0000',
          meta: [],
          body: ''
        },
        updates: []
      })
    })
    test('should handle meta items', () => {
      expect(helpers.looseJsonToIssueJson({
        created: '2016-10-13T21:03:29.711+0000',
        priority: 'high'
      })).toEqual({
        original: {
          title: '',
          creator: '',
          created: '2016-10-13T21:03:29.711+0000',
          meta: [{
            key: 'priority',
            value: 'high'
          }],
          body: ''
        },
        updates: []
      })
    })
    test('should handle updates', () => {
      expect(helpers.looseJsonToIssueJson({
        created: '2016-10-13T21:03:29.711+0000'
      }, { modifier: 'Some Guy', modified: '2016-10-13T22:03:23.711+0000', type: 'comment', body: 'some comment' })).toEqual({
        original: {
          title: '',
          creator: '',
          created: '2016-10-13T21:03:29.711+0000',
          meta: [],
          body: ''
        },
        updates: [{ modifier: 'Some Guy', modified: '2016-10-13T22:03:23.711+0000', type: 'comment', body: 'some comment' }]
      })
    })
    test('should handle sparse updates', () => {
      expect(helpers.looseJsonToIssueJson({
        created: '2016-10-13T21:03:29.711+0000'
      }, { modified: '2016-10-13T22:03:23.711+0000', type: 'comment', body: 'some comment' }, true)).toEqual({
        original: {
          created: '2016-10-13T21:03:29.711+0000',
          meta: []
        },
        updates: [{ modified: '2016-10-13T22:03:23.711+0000', type: 'comment', body: 'some comment' }]
      })
    })
  })

  describe('now function', () => {
    test('should return current timestamp as date string', () => {
      expect(helpers.now().slice(-5)).toBe('+0000')
    })
  })
})
