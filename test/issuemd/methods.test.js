/* global describe test expect beforeEach */

'use strict'

import issuemd from '../../components/issuemd/core.js'
import * as methods from '../../components/issuemd/methods.js'
import { loadFixture } from '../fixtures/index.js'

const type = me => Object.prototype.toString.call(me).split(/\W/)[2].toLowerCase()

describe('file:issuemd/methods.js', () => {
  let collection

  beforeEach(() => {
    collection = issuemd(loadFixture('simple-multiple.issue.md'))
  })

  describe('concat function', () => {
    test('should concat issues without altering original', () => {
      var collectionToConcat = issuemd(loadFixture('simple-sample.issue.md'))
      expect(collection.length).toBe(2)
      expect(methods.concat(collection, collectionToConcat).length).toBe(3)
      expect(collection.length).toBe(2)
    })
  })

  describe('toArray function', () => {
    test('should produce array from collection', () => {
      expect(type(collection)).toBe('object')
      expect(type(methods.toArray(collection))).toBe('array')
    })
  })

  describe('toJSON function', () => {
    test('should be json serialisable via JSON.stringify', () => {
      expect(type(methods.toJSON(collection))).toBe('array')
      expect(JSON.stringify(collection, null, 2)).toBe(loadFixture('simple-multiple.issue.json'))
    })
  })

  describe('main function', () => {
    test('should produce collection from md string', () => {
      expect(methods.main(null, loadFixture('simple-multiple.issue.md')).length).toBe(2)
      expect(methods.main(null, loadFixture('simple-sample.issue.md')).length).toBe(1)
    })

    test('should produce collection from js object', () => {
      expect(methods.main(null, JSON.parse(loadFixture('simple-multiple.issue.json'))).length).toBe(2)
    })

    test('should produce collection from collection', () => {
      expect(methods.main(null, collection).length).toBe(2)
    })

    test('should produce collection from array of md strings', () => {
      expect(methods.main(null, [loadFixture('simple-multiple.issue.md'), loadFixture('simple-sample.issue.md')]).length).toBe(3)
    })

    test('should produce collection from array of mixed input types', () => {
      expect(methods.main(null, JSON.parse(loadFixture('simple-multiple.issue.json')).concat([loadFixture('simple-sample.issue.md')])).length).toBe(3)
    })
  })

  // TODO: more tests for this function
  describe('merge function', () => {
    test('should merge identical inputs without difference', () => {
      expect(collection.clone()).toEqual(methods.merge(collection, issuemd(collection.md())))
    })
  })

  describe('attr function', () => {
    test('should return specified attr for first issue in collection', () => {
      expect(methods.attr(collection, 'id')).toBe('11')
    })

    test('should return all attrs for first issue in collection', () => {
      expect(methods.attr(collection)).toEqual(JSON.parse(loadFixture('simple-multiple.issue.attr.json')))
    })
  })

  describe('signature function', () => {
    test('should return signature for first issue in collection', () => {
      expect(methods.signature(collection)).toBe('Some Guy @ 2016-10-11T21:03:29.711+0000')
    })

    test('attr should return null when there are not the required parts in first issue', () => {
      delete collection[0].original.creator
      expect(methods.signature(collection)).toBe(null)
    })
  })

  describe('filter function', () => {
    test('should filter by function', () => {
      expect(methods.filter(collection, issue => issue.attr('id') === '13').attr('id')).toBe('13')
    })

    test('should filter by attribute', () => {
      expect(methods.filter(collection, 'id', '13').attr('id')).toBe('13')
    })
  })

  describe('hash function', () => {
    test('should return hash of first issue', () => {
      expect(methods.hash(collection)).toBe('5c9a5c1ef54a845cd195ae333689aa1f')
    })

    test('should return hash of first issue with specified length', () => {
      expect(methods.hash(collection, 6)).toBe('5c9a5c')
    })

    test('should return all hashes', () => {
      var hashes = methods.hash(collection, true)
      expect(hashes[0]).toBe('5c9a5c1ef54a845cd195ae333689aa1f')
      expect(hashes[1]).toBe('7ce2f8d84a02ddeb2df71eb34af68334')
    })

    test('should return all hashes with specified length', () => {
      var hashes = methods.hash(collection, 6, true)
      expect(hashes[0]).toBe('5c9a5c')
      expect(hashes[1]).toBe('7ce2f8')
    })
  })

  describe('comments function', () => {
    test('should fetch comments', () => {
      var collection = issuemd(loadFixture('simple-multiple-updated.issue.md'))
      expect(collection.comments()).toEqual(JSON.parse(loadFixture('simple-multiple-updates.issue.json')))
    })
  })

  describe('update function', () => {
    test('should add updates to all issues in collection', () => {
      methods.update(collection, {
        modified: new Date('2016-12-02T13:44').toISOString().replace(/Z$/, '+0000'),
        modifier: 'Some Guy',
        type: 'comment',
        body: 'and another comment'
      }, {
        modified: new Date('2016-12-02T15:44').toISOString().replace(/Z$/, '+0000'),
        modifier: 'Some Other Guy',
        type: 'comment',
        priority: 'high',
        body: 'yet another comment'
      })
      expect(collection.md()).toEqual(loadFixture('simple-multiple-updated.issue.md'))
    })

    test('should accept array of updates as input', () => {
      methods.update(collection, [{
        modified: new Date('2016-12-02T13:44').toISOString().replace(/Z$/, '+0000'),
        modifier: 'Some Guy',
        type: 'comment',
        body: 'and another comment'
      }, {
        modified: new Date('2016-12-02T15:44').toISOString().replace(/Z$/, '+0000'),
        modifier: 'Some Other Guy',
        type: 'comment',
        priority: 'high',
        body: 'yet another comment'
      }])
      expect(collection.md()).toEqual(loadFixture('simple-multiple-updated.issue.md'))
    })
  })

  describe('clone function', () => {
    var copy

    beforeEach(() => {
      copy = collection.clone()
    })

    test('should create deeply equal copy', () => {
      expect(collection).toEqual(copy)
    })

    test('should not keep references to original object', () => {
      copy[0].original.title = 'Some different title'
      expect(copy.attr('title')).toBe('Some different title')
      expect(collection.attr('title')).toBe('Some issue title')
    })
  })

  describe('remove function', () => {
    test('should remove issue from collection', () => {
      expect(collection.length).toBe(2)
      collection.remove(0)
      expect(collection.length).toBe(1)
    })

    test('should remove multiple issues from collection', () => {
      expect(collection.length).toBe(2)
      collection.remove(0, 1)
      expect(collection.length).toBe(0)
    })

    test('should accept arguments as array', () => {
      expect(collection.length).toBe(2)
      collection.remove([0, 1])
      expect(collection.length).toBe(0)
    })
  })

  describe('each function', () => {
    test('should iterate each issue in collection', () => {
      var titles = []
      collection.each(function (issue) {
        titles.push(issue.attr('title'))
      })
      expect(titles).toEqual(['Some issue title', 'Some other issue title'])
    })
  })

  describe('map function', () => {
    test('should iterate each issue in collection', () => {
      var titles = collection.map(function (issue) {
        return issue.attr('title')
      })
      expect(titles).toEqual(['Some issue title', 'Some other issue title'])
    })
  })

  describe('eq function', () => {
    test('should select issue based in suppolied index', () => {
      expect(collection.eq(0).attr('title')).toBe('Some issue title')
      expect(collection.eq(1).attr('title')).toBe('Some other issue title')
    })
  })

  describe('first function', () => {
    test('should return first issue in collection', () => {
      expect(collection.first()).toEqual(collection.eq(0))
      expect(collection.first().attr('title')).toBe('Some issue title')
    })

    test('should return first x issues in collection', () => {
      expect(collection.first().length).toBe(1)
      expect(collection.first(1).length).toBe(1)
      expect(collection.first(2).length).toBe(2)
      expect(collection.first(3).length).toBe(2)
    })
  })

  describe('last function', () => {
    test('should return last issue in collection', () => {
      expect(collection.last()).toEqual(collection.eq(collection.length - 1))
      expect(collection.last().attr('title')).toBe('Some other issue title')
    })

    test('should return last x issues in collection', () => {
      expect(collection.last().length).toBe(1)
      expect(collection.last(1).length).toBe(1)
      expect(collection.last(2).length).toBe(2)
      expect(collection.last(3).length).toBe(2)
    })
  })

  describe('add function', () => {
    test('should add issue to collection', () => {
      expect(collection.length).toBe(2)
      collection.add(loadFixture('simple-multiple-updates.issue.json'))
      expect(collection.length).toBe(3)
    })
  })

  describe('collectionSortUpdates function', () => {
    var copy

    beforeEach(() => {
      collection = issuemd(loadFixture('simple-multiple-updated.issue.md'))
      copy = collection.clone()
    })

    test('should sort updates for all issues in collection', () => {
      expect(collection).toEqual(copy)
      collection[0].updates = collection[0].updates.reverse()
      expect(collection).not.toEqual(copy)
      collection.sortUpdates()
      expect(collection).toEqual(copy)
    })
  })
})
