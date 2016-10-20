'use strict';

import * as utils from '../utils';
import * as helpers from './helpers.js';
import * as methods from './methods.js';
import * as formatter from './formatter.js';

export default function issuemd() {
    return issuemd.fn.main.apply(null, arguments);
}

issuemd.version = '__ISSUEMD_VERSION__';

issuemd.fn = Issuemd.prototype = {

    // don't use default object constructor so we can identify collections later on
    constructor: Issuemd,

    // enable collections to behave like an Array
    length: 0,

    push: [].push,
    sort: [].sort,
    splice: [].splice,
    pop: [].pop

};

// main constructor function
function Issuemd() {}

// attach methods to Issuemd prototype (`issuemd.fn`)
utils.each(utils.extend({}, methods, formatter), function(method, name) {
    issuemd.fn[name] = function() {
        return method.apply(null, [this].concat([].slice.call(arguments, 0)));
    };
    issuemd.fn[name].usage = function() {
        var m = method.toString().match(/\/\*(\#+ *(.|[\r\n])+)\*\//);
        if (m) {
            return utils.map(m[1].split('\n'), line => utils.trim(line)).join('\n');
        } else {
            return '';
        }
    };
});

issuemd.helpers = helpers;

issuemd.utils = utils;
