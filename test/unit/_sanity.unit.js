'use strict';

describe('sanity: check test environment works as expected', () => {

    describe('environment executes javascript correctly', () => {

        it('should eval simple maths', () => {
            assert.equal(eval('1 + 2 + 3'), 6, 'sum 1 to 3'); //jshint ignore:line
            assert.equal(eval('true + true'), 2, 'add booleans (it is javascript after all)'); //jshint ignore:line
        });

        it('should handle arrow es2015 functions', () => {
            var arr = [1, 2, 3, 4, 5];
            assert.equal(eval(arr.join('+')), arr.reduce((a, b) => a + b), 'reduce and eval and arrow functions work as expected'); //jshint ignore:line
        });

    });

});
