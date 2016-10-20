'use strict';

import * as helpers from '../../../src/issuemd/helpers.js';

describe('file:issuemd/helpers.js', () => {

    describe('hash calculates correctly', () => {
        it('should generate hash', () => {
            assert.equal(helpers.hash('Some Guy @ 2013-02-04'), '2a924eeb2bb1753109a8f2a3566a15a9', 'calculates hash');
        });
    });

    describe('compose signature from parts', () => {
        it('should compose signature for given inputs', () => {
            assert.equal(helpers.composeSignature('Some Guy', '2013-02-04'), 'Some Guy @ 2013-02-04', 'composes signature');
        });
    });

    describe('dateString function', () => {
        it('should return ISO date string with normalised timezone', () => {
            assert.equal(helpers.dateString(new Date('2012-02-01')), '2012-02-01T00:00:00.000+0000', 'returns date string with +0000 instead of Z for timezone offset');
        });
    });

    describe('issueJsonToLoose function', () => {
        it('should return json data structure for issue', () => {
            assert.deepEqual(helpers.issueJsonToLoose({
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
            }), { body: '', created: '2016-10-13T21:03:29.711+0000', creator: '', priority: 'medium', title: '' }, 'issueJsonToLoose');
        });
    });

    describe('looseJsonToIssueJson function', () => {
        it('should return data structure for issue', () => {
            assert.deepEqual(helpers.looseJsonToIssueJson({
                created: '2016-10-13T21:03:29.711+0000'
            }), {
                original: {
                    title: '',
                    creator: '',
                    created: '2016-10-13T21:03:29.711+0000',
                    meta: [],
                    body: ''
                },
                updates: []
            }, 'looseJsonToIssueJson');
        });
        it('should handle meta items', () => {
            assert.deepEqual(helpers.looseJsonToIssueJson({
                created: '2016-10-13T21:03:29.711+0000',
                priority: 'high'
            }), {
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
            }, 'looseJsonToIssueJson');
        });
        it('should handle updates', () => {
            assert.deepEqual(helpers.looseJsonToIssueJson({
                created: '2016-10-13T21:03:29.711+0000'
            }, { modifier: 'Some Guy', modified: '2016-10-13T22:03:23.711+0000', type: 'comment', body: 'some comment' }), {
                original: {
                    title: '',
                    creator: '',
                    created: '2016-10-13T21:03:29.711+0000',
                    meta: [],
                    body: ''
                },
                updates: [{ modifier: 'Some Guy', modified: '2016-10-13T22:03:23.711+0000', type: 'comment', body: 'some comment' }]
            }, 'looseJsonToIssueJson');
        });
        it('should handle sparse updates', () => {
            assert.deepEqual(helpers.looseJsonToIssueJson({
                created: '2016-10-13T21:03:29.711+0000'
            }, { modified: '2016-10-13T22:03:23.711+0000', type: 'comment', body: 'some comment' }, true), {
                original: {
                    created: '2016-10-13T21:03:29.711+0000',
                    meta: [],
                },
                updates: [{ modified: '2016-10-13T22:03:23.711+0000', type: 'comment', body: 'some comment' }]
            }, 'looseJsonToIssueJson');
        });
    });

    describe('now function', () => {
        it('should return current timestamp as date string', () => {
            assert.equal(helpers.now().slice(-5), '+0000', 'returns date string for now');
        });
    });

});
