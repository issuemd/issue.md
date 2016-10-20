'use strict';

import config from '../../../src/issuemd/config.js';

describe('file:issuemd/config.js', () => {

    describe('issuemd config', () => {
        it('should have version string defined', () => {
            assert.equal(typeof config.version, 'string', 'config has version string');
        });
    });

});
