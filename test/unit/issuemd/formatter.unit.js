'use strict';

import issuemd from '../../../src/issuemd/core.js';
import * as formatter from '../../../src/issuemd/formatter.js';

describe('file:issuemd/formatter.js', () => {

    var collection;

    beforeEach(() => {
        collection = issuemd(loadFixture('simple-multiple.issue.md'));
    });

    describe('format multiple issues in various outputs', () => {

        it('toString should be defined as function', () => {
            assert.equal(typeof formatter.toString, 'function', 'toString is function');
        });

        it('toString should match fixtures', () => {
            assert.equal(formatter.toString(collection), loadFixture('simple-multiple.issue.string.txt'), 'toString output matches default fixture');
            assert.equal(formatter.toString(collection, 64), loadFixture('simple-multiple.issue.string-64.txt'), 'toString output matches 64 character fixture');
            assert.equal(formatter.toString(issuemd(loadFixture('meta-sample.issue.md'))), loadFixture('meta-sample.issue.string.txt'), 'toString output matches meta fixture');
        });

        it('summary should be defined as function', () => {
            assert.equal(typeof formatter.summary, 'function', 'summary is function');
        });

        it('summary should match fixtures', () => {
            assert.equal(formatter.summary(collection), loadFixture('simple-multiple.issue.summary.txt'), 'summary output matches default fixture');
            assert.equal(formatter.summary(collection, 64), loadFixture('simple-multiple.issue.summary-64.txt'), 'summary output matches 64 character fixture');
        });

        it('html should be defined as function', () => {
            assert.equal(typeof formatter.html, 'function', 'html is function');
        });

        it('html should match fixtures', () => {
            assert.equal(formatter.html(collection), loadFixture('simple-multiple.issue.html'), 'html output matches fixture');
        });

        it('md should be defined as function', () => {
            assert.equal(typeof formatter.md, 'function', 'md is function');
        });

        it('md should match fixtures', () => {
            assert.equal(formatter.md(collection), loadFixture('simple-multiple.issue.md'), 'md output matches fixture');
        });

        it('md should merge md input', () => {
            assert.equal(formatter.md(collection, loadFixture('simple-sample.issue.md')), loadFixture('simple-merged.issue.md'), 'md merges and matches fixture');
        });

    });

});
