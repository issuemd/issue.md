'use strict';

import * as utils from '../utils';
import md5 from '../lib/md5';

// helper function ensures consistant signature creation
export function composeSignature(creator, created) {
    return utils.trim(creator) + ' @ ' + utils.trim(created);
}

export function issueJsonToLoose(issue) {

    var out = (utils.copy(issue) || {}).original || {};

    utils.each(out.meta, function(meta) {
        out[meta.key] = meta.value;
    });

    utils.each(issue.updates, function(update) {
        utils.each(update.meta, function(meta) {
            out[meta.key] = meta.value;
        });
    });

    delete out.meta;

    return out;

}

// accept original main properties mixed with arbitrary meta, and return issueJson structure
// coerces all values to strings, adds default created/modified timestamps
export function looseJsonToIssueJson(original /*, updates..., sparse*/ ) {

    var sparse = utils.getLastArgument(arguments, 'boolean', false);

    var updates = [].slice.call(arguments, 1);

    if (sparse) {
        updates.pop();
    }

    var out = {
        original: {
            title: (original.title || '') + '',
            creator: (original.creator || '') + '',
            created: (original.created || now()) + '',
            meta: original.meta || [],
            body: (original.body || '') + ''
        },
        updates: updates || []
    };

    utils.each(original, function(value, key) {

        if (utils.objectKeys(out.original).indexOf(key) === -1) {

            out.original.meta.push({
                key: key,
                value: value + ''
            });

        }

    });

    utils.each(out.updates, function(update) {
        update.modified = update.modified || now();
    });

    if (sparse) {

        utils.each(out.original, function(value, key) {

            if (key !== 'meta' && utils.objectKeys(original).indexOf(key) === -1) {
                delete out.original[key];
            }

        });

    }

    return out;

}

export function now() {
    return dateString(new Date());
}

export function dateString(inputDate) {
    return inputDate.toISOString().replace(/Z$/, '+0000');
}

// return firstbits hash of input, optionally specify `size` which defaults to 32
export function hash(string, size) {
    return md5(string).slice(0, size || 32);
}
