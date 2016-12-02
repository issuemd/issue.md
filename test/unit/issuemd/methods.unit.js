/* global describe,it,assert,beforeEach,loadFixture */

'use strict'

import issuemd from '../../../src/issuemd/core.js'
import * as methods from '../../../src/issuemd/methods.js'

describe('file:issuemd/methods.js', () => {
  var collection

  beforeEach(() => {
    collection = issuemd(loadFixture('simple-multiple.issue.md'))
  })

  describe('concat function', () => {
    it('should concat issues', () => {
      var collectionToConcat = issuemd(loadFixture('simple-sample.issue.md'))
      assert.equal(collection.length, 2, 'should be 2 issues in original collection')
      assert.equal(methods.concat(collection, collectionToConcat).length, 3, 'should be 3 issues in collection after concat')
      assert.equal(collection.length, 2, 'should be still 2 issues in original collection')
    })
  })

  describe('toArray function', () => {
    it('should produce array from collection', () => {
      assert.isObject(collection, 'collection should be object')
      assert.isArray(methods.toArray(collection), 'collection toArray should be array')
    })
  })

  describe('toJSON function', () => {
    it('should produce json from collection', () => {
      assert.isArray(methods.toJSON(collection), 'calling toJSON on collection should produce array')
      assert.equal(JSON.stringify(collection, null, 2), loadFixture('simple-multiple.issue.json'), 'collection should be json serialisable via JSON.stringify')
    })
  })

  describe('main function', () => {
    it('should produce collection from md string', () => {
      assert.equal(methods.main(null, loadFixture('simple-multiple.issue.md')).length, 2, 'main function should accept js issue object')
      assert.equal(methods.main(null, loadFixture('simple-sample.issue.md')).length, 1, 'main function should accept js issue object')
    })

    it('should produce collection from js object', () => {
      assert.equal(methods.main(null, JSON.parse(loadFixture('simple-multiple.issue.json'))).length, 2, 'main function should accept js issue object')
    })

    it('should produce collection from collection', () => {
      assert.equal(methods.main(null, collection).length, 2, 'main function should accept collection')
    })

    it('should produce collection from array of md strings', () => {
      assert.equal(methods.main(null, [loadFixture('simple-multiple.issue.md'), loadFixture('simple-sample.issue.md')]).length, 3, 'main function should accept array (of strings)')
    })

    it('should produce collection from array of mixed input types', () => {
      assert.equal(methods.main(null, JSON.parse(loadFixture('simple-multiple.issue.json')).concat([loadFixture('simple-sample.issue.md')])).length, 3, 'main function should accept array (of mixed types)')
    })
  })

    // TODO: more tests for this function
  describe('merge function', () => {
    it('should merge identical inputs without difference', () => {
      assert.deepEqual(collection.clone(), methods.merge(collection, issuemd(collection.md())), 'merge should not add identical issues to collection')
    })
  })

  describe('attr function', () => {
    it('should return specified attr for first issue in collection', () => {
      assert.equal(methods.attr(collection, 'id'), '11', 'return id')
    })

    it('should return all attrs for first issue in collection', () => {
      assert.deepEqual(methods.attr(collection), JSON.parse(loadFixture('simple-multiple.issue.attr.json')), 'return all attrs')
    })
  })

  describe('signature function', () => {
    it('should return signature for first issue in collection', () => {
      assert.equal(methods.signature(collection), 'Some Guy @ 2016-10-11T21:03:29.711+0000', 'signature of first issue')
    })

    it('attr should return null when there are not the required parts in first issue', () => {
      delete collection[0].original.creator
      assert.equal(methods.signature(collection), null, 'null when there is no creator')
    })
  })

  describe('filter function', () => {
    it('should filter by function', () => {
      assert.equal(methods.filter(collection, issue => issue.attr('id') === '13').attr('id'), '13', 'filter by function returning matching id')
    })

    it('should filter by attribute', () => {
      assert.equal(methods.filter(collection, 'id', '13').attr('id'), '13', 'filter by attribute returning matching id')
    })
  })

  describe('hash function', () => {
    it('should return hash of first issue', () => {
      assert.equal(methods.hash(collection), '5c9a5c1ef54a845cd195ae333689aa1f', 'return hash with no arguments')
    })

    it('should return hash of first issue with specified length', () => {
      assert.equal(methods.hash(collection, 6), '5c9a5c', 'return hash with specified length')
    })

    it('should return all hashes', () => {
      var hashes = methods.hash(collection, true)
      assert.equal(hashes[0], '5c9a5c1ef54a845cd195ae333689aa1f', 'return all hashes - 0')
      assert.equal(hashes[1], '7ce2f8d84a02ddeb2df71eb34af68334', 'return all hashes - 1')
    })

    it('should return all hashes with specified length', () => {
      var hashes = methods.hash(collection, 6, true)
      assert.equal(hashes[0], '5c9a5c', 'return all hashes with specified length - 0')
      assert.equal(hashes[1], '7ce2f8', 'return all hashes with specified length - 1')
    })
  })

  describe('comments function', () => {
    it('should fetch comments', () => {
      var collection = issuemd(loadFixture('simple-multiple-updated.issue.md'))
      assert.deepEqual(collection.comments(), JSON.parse(loadFixture('simple-multiple-updates.issue.json')), 'comments match fixture')
    })
  })

  describe('update function', () => {
    it('should add updates to all issues in collection', () => {
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
      assert.deepEqual(collection.md(), loadFixture('simple-multiple-updated.issue.md'), 'updates match fixtures - arguments')
    })

    it('should accept array of updates as input', () => {
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
      assert.deepEqual(collection.md(), loadFixture('simple-multiple-updated.issue.md'), 'updates match fixtures - array')
    })
  })

  describe('clone function', () => {
    var copy

    beforeEach(() => {
      copy = collection.clone()
    })

    it('should create faithful copy', () => {
      assert.deepEqual(collection, copy, 'clone creates deeply equal copy')
    })

    it('should not keep references to original object', () => {
      copy[0].original.title = 'Some different title'
      assert.equal(copy.attr('title'), 'Some different title', 'copy has new title')
      assert.equal(collection.attr('title'), 'Some issue title', 'copy has new title')
    })
  })

  describe('remove function', () => {
    it('should remove issue from collection', () => {
      assert.deepEqual(collection.length, 2, 'collection length starts at 2')
      collection.remove(0)
      assert.deepEqual(collection.length, 1, 'collection length after removing 1 is 1')
    })

    it('should remove multiple issues from collection', () => {
      assert.deepEqual(collection.length, 2, 'collection length starts at 2')
      collection.remove(0, 1)
      assert.deepEqual(collection.length, 0, 'collection length after removing 2 is 0')
    })

    it('should accept arguments as array', () => {
      assert.deepEqual(collection.length, 2, 'collection length starts at 2')
      collection.remove([0, 1])
      assert.deepEqual(collection.length, 0, 'collection length after removing 2 is 0')
    })
  })

  describe('each function', () => {
    it('should iterate each issue in collection', () => {
      var titles = []
      collection.each(function (issue) {
        titles.push(issue.attr('title'))
      })
      assert.deepEqual(titles, ['Some issue title', 'Some other issue title'], 'titles matches expectation')
    })
  })

  describe('map function', () => {
    it('should iterate each issue in collection', () => {
      var titles = collection.map(function (issue) {
        return issue.attr('title')
      })
      assert.deepEqual(titles, ['Some issue title', 'Some other issue title'], 'titles matches expectation')
    })
  })

  describe('eq function', () => {
    it('should select issue based in suppolied index', () => {
      assert.equal(collection.eq(0).attr('title'), 'Some issue title', 'title matches expectation - 0')
      assert.equal(collection.eq(1).attr('title'), 'Some other issue title', 'title matches expectation - 1')
    })
  })

  describe('first function', () => {
    it('should return first issue in collection', () => {
      assert.deepEqual(collection.first(), collection.eq(0), 'first returns same as eq(0)')
      assert.equal(collection.first().attr('title'), 'Some issue title', 'title matches expectation')
    })

    it('should return first x issues in collection', () => {
      assert.equal(collection.first().length, 1, 'returns expected number of issues - undefined')
      assert.equal(collection.first(1).length, 1, 'returns expected number of issues - 1')
      assert.equal(collection.first(2).length, 2, 'returns expected number of issues - 2')
      assert.equal(collection.first(3).length, 2, 'returns expected number of issues - 3')
    })
  })

  describe('last function', () => {
    it('should return last issue in collection', () => {
      assert.deepEqual(collection.last(), collection.eq(collection.length - 1), 'last returns same as eq(collection.length - 1)')
      assert.equal(collection.last().attr('title'), 'Some other issue title', 'title matches expectation')
    })

    it('should return last x issues in collection', () => {
      assert.equal(collection.last().length, 1, 'returns expected number of issues - undefined')
      assert.equal(collection.last(1).length, 1, 'returns expected number of issues - 1')
      assert.equal(collection.last(2).length, 2, 'returns expected number of issues - 2')
      assert.equal(collection.last(3).length, 2, 'returns expected number of issues - 3')
    })
  })

  describe('add function', () => {
    it('should add issue to collection', () => {
      assert.equal(collection.length, 2, 'collection length starts at 2')
      collection.add(loadFixture('simple-multiple-updates.issue.json'))
      assert.equal(collection.length, 3, 'after adding issue becomes 3')
    })
  })

  describe('collectionSortUpdates function', () => {
    var copy

    beforeEach(() => {
      collection = issuemd(loadFixture('simple-multiple-updated.issue.md'))
      copy = collection.clone()
    })

    it('should sort updates for all issues in collection', () => {
      assert.deepEqual(collection, copy, 'collection initially identical to copy')
      collection[0].updates = collection[0].updates.reverse()
      assert.notDeepEqual(collection, copy, 'after reversal, no longer identical to copy')
      collection.sortUpdates()
      assert.deepEqual(collection, copy, 'after sort, identical to copy again')
    })
  })
})
