/* global describe,it,assert,beforeEach,loadFixture */

'use strict'

import issuemd from '../../../src/issuemd/core.js'
import * as extensions from '../../../src/issuemd/extensions.js'

describe('file:issuemd/extensions.js', () => {
  var collection

  beforeEach(() => {
    collection = issuemd(loadFixture('simple-multiple.issue.md'))
  })

  describe('created extension', () => {
    it('should be defined as function', () => {
      assert.equal(typeof extensions.created, 'function', 'created is function')
    })

    it('should return created dates', () => {
      assert.deepEqual(extensions.created(collection), ['2016-10-11T21:03:29.711+0000', '2016-10-16T23:01:23.731+0000'], 'return array of created dates')
    })

    it('should set created dates', () => {
      assert.notEqual(extensions.created(collection)[0], '2012-01-01T00:00:00.000+0000', 'created date is not target date - 0')
      assert.notEqual(extensions.created(collection)[1], '2012-01-01T00:00:00.000+0000', 'created date is not target date - 1')
      extensions.created(collection, '2012-01-01T00:00:00.000+0000')
      assert.equal(extensions.created(collection)[0], '2012-01-01T00:00:00.000+0000', 'created has changed to target date - 0')
      assert.equal(extensions.created(collection)[1], '2012-01-01T00:00:00.000+0000', 'created has changed to target date - 1')
    })
  })

  describe('id extension', () => {
    it('should be defined as function', () => {
      assert.equal(typeof extensions.id, 'function', 'id is function')
    })

    it('should return id', () => {
      assert.deepEqual(extensions.id(collection), ['11', '13'], 'return array of id')
    })

    it('should set id', () => {
      assert.notEqual(extensions.id(collection)[0], '12', 'id is not target id - 0')
      assert.notEqual(extensions.id(collection)[1], '12', 'id is not target id - 1')
      extensions.id(collection, '12')
      assert.equal(extensions.id(collection)[0], '12', 'id has changed to target id - 0')
      assert.equal(extensions.id(collection)[1], '12', 'id has changed to target id - 1')
    })
  })

  describe('byID extension', () => {
    it('should be defined as function', () => {
      assert.equal(typeof extensions.byID, 'function', 'byID is function')
    })

    it('should return id', () => {
      assert.equal(extensions.byID(collection, '13').attr('title'), 'Some other issue title', 'return issue matching id')
    })
  })
})
