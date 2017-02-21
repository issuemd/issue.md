/* global describe test expect beforeEach */

'use strict'

import issuemd from '../../components/issuemd/core.js'
import * as formatter from '../../components/issuemd/formatter.js'
import { loadFixture } from '../fixtures/index.js'

describe('file:issuemd/formatter.js', () => {
  var collection

  beforeEach(() => {
    collection = issuemd(loadFixture('simple-multiple.issue.md'))
  })

  describe('format multiple issues in various outputs', () => {
    test('toString should be defined as function', () => {
      expect(typeof formatter.toString).toBe('function')
    })

    test('toString should match fixtures', () => {
      expect(formatter.toString(collection)).toBe(loadFixture('simple-multiple.issue.string.txt'))
      expect(formatter.toString(collection, 64)).toBe(loadFixture('simple-multiple.issue.string-64.txt'))
      expect(formatter.toString(issuemd(loadFixture('meta-sample.issue.md')))).toBe(loadFixture('meta-sample.issue.string.txt'))
    })

    test('summary should be defined as function', () => {
      expect(typeof formatter.summary).toBe('function')
    })

    test('summary should match fixtures', () => {
      expect(formatter.summary(collection)).toBe(loadFixture('simple-multiple.issue.summary.txt'))
      expect(formatter.summary(collection, 64)).toBe(loadFixture('simple-multiple.issue.summary-64.txt'))
    })

    test('html should be defined as function', () => {
      expect(typeof formatter.html).toBe('function')
    })

    test('html should match fixtures', () => {
      expect(formatter.html(collection)).toBe(loadFixture('simple-multiple.issue.html'))
    })

    test('md should be defined as function', () => {
      expect(typeof formatter.md).toBe('function')
    })

    test('md should match fixtures', () => {
      expect(formatter.md(collection)).toBe(loadFixture('simple-multiple.issue.md'))
    })

    test('md should merge md input', () => {
      expect(formatter.md(collection, loadFixture('simple-sample.issue.md'))).toBe(loadFixture('simple-merged.issue.md'))
    })
  })
})
