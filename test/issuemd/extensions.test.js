/* global describe test expect beforeEach */
'use strict'

import issuemd from '../../components/issuemd/core.js'
import * as extensions from '../../components/issuemd/extensions.js'
import { loadFixture } from '../fixtures/index.js'

describe('file:issuemd/extensions.js', () => {
  var collection

  beforeEach(() => {
    collection = issuemd(loadFixture('simple-multiple.issue.md'))
  })

  describe('created extension', () => {
    test('should be defined as function', () => {
      expect(typeof extensions.created).toBe('function')
    })

    test('should return created dates', () => {
      expect(extensions.created(collection)).toEqual(['2016-10-11T21:03:29.711+0000', '2016-10-16T23:01:23.731+0000'])
    })

    test('created date is not target date - 0', () => {
      expect(extensions.created(collection)[0]).not.toBe('2012-01-01T00:00:00.000+0000')
    })
    test('created date is not target date - 1', () => {
      expect(extensions.created(collection)[1]).not.toBe('2012-01-01T00:00:00.000+0000')
    })
    test('created has changed to target date - 0', () => {
      extensions.created(collection, '2012-01-01T00:00:00.000+0000')
      expect(extensions.created(collection)[0]).toBe('2012-01-01T00:00:00.000+0000')
      expect(extensions.created(collection)[1]).toBe('2012-01-01T00:00:00.000+0000')
    })
  })

  describe('id extension', () => {
    test('should be defined as function', () => {
      expect(typeof extensions.id, 'function', 'id is function')
    })

    test('should return id', () => {
      expect(extensions.id(collection)).toEqual(['11', '13'])
    })

    test('id is not target id - 0', () => {
      expect(extensions.id(collection)[0]).not.toBe('12')
    })
    test('id is not target id - 1', () => {
      expect(extensions.id(collection)[1]).not.toBe('12')
    })
    test('id has changed to target id - 0', () => {
      extensions.id(collection, '12')
      expect(extensions.id(collection)[0]).toBe('12')
      expect(extensions.id(collection)[1]).toBe('12')
    })
  })

  describe('byID extension', () => {
    test('should be defined as function', () => {
      expect(typeof extensions.byID).toBe('function')
    })

    test('return issue matching id', () => {
      expect(extensions.byID(collection, '13').attr('title')).toBe('Some other issue title')
    })
  })
})
