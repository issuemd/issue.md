'use strict';

// return last argument if it is of targetType, otherwise return null
export function getLastArgument(args, targetType, defaultValue) {
    var last = args[args.length - 1];
    return type(last) === targetType ? last : defaultValue || null;
}

export function defined(item) {
    return typeof item !== 'undefined' && item !== null;
}

export function times(qty, fn) {
    var i,
        result;
    for (i = 0; i < qty; i++) {
        result = fn(i, result);
    }
    return result;
}

export function copy(input) {
    return JSON.parse(JSON.stringify(input));
}

export function type(me) {
    return Object.prototype.toString.call(me).split(/\W/)[2].toLowerCase();
}

export function each(obj, iteratee, context) {

    if (obj === null || obj === undefined) {
        return obj;
    }

    if (context !== void 0) {

        iteratee = function(value, other) {
            return iteratee.call(context, value, other);
        };

    }

    var i, length = obj.length;

    if (length === +length) {

        for (i = 0; i < length; i++) {

            if (iteratee(obj[i], i, obj) === false) {
                break;
            }

        }

    } else {

        var keys = objectKeys(obj);

        for (i = 0, length = keys.length; i < length; i++) {

            if (iteratee(obj[keys[i]], keys[i], obj) === false) {
                break;
            }

        }

    }

    return obj;

}

export function objectKeys(obj) {

    var keys = [];

    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            keys.push(i);
        }
    }

    return keys;
}

export function trim(string) {

    return (string + '').replace(/(^\s+|\s+$)/g, '');

}

export function extend(original /*, addition...*/ ) {

    var args = [].slice.call(arguments, 1);

    for (var i in args) {

        var addition = args[i];

        for (var prop in addition) {
            if (Object.prototype.hasOwnProperty.call(addition, prop)) {
                original[prop] = addition[prop];
            }
        }

    }

    return original;

}

// more full featured implementation: https://gist.github.com/billymoon/91db9ccada62028b50c7
export function wordwrap(str, intWidth) {

    var result = [];

    each(str.split(/\r\n|\n|\r/), function(line) {

        var endPosition, segment,
            out = '';

        while (line.length > intWidth) {

            segment = line.slice(0, intWidth + 1).match(/\S*(\s)?$/);

            if (!!segment[1]) {
                endPosition = intWidth;
            } else if (segment.input.length - segment[0].length) {
                endPosition = segment.input.length - segment[0].length;
            } else {
                endPosition = intWidth;
            }

            out += line.slice(0, endPosition);

            line = line.slice(endPosition);

            line = line.replace(/^\s+/, '');

            if (!!line && line.length) {
                out += '\n';
            }

        }

        result.push(out + line);

    });

    return result.join('\n');

}

// adapted from:
//     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Map#Polyfill
// ... and ...
//     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#Polyfill
/* beautify preserve:start */
export function map(a,b,c){var d,e,f;if(null==a)throw new TypeError('map called on null or undefined');var g=Object(a),h=g.length>>>0;if('function'!=typeof b)throw new TypeError(b+' is not a function');for(arguments.length>1&&(d=c),e=new Array(h),f=0;h>f;){var i,j;f in g&&(i=g[f],j=b.call(d,i,f,g),e[f]=j),f++}return e} // jshint ignore:line
export function reduce(a,b){if(null==a)throw new TypeError('reduce called on null or undefined');if('function'!=typeof b)throw new TypeError(b+' is not a function');var f,c=Object(a),d=c.length>>>0,e=0;if(3==arguments.length)f=arguments[2];else{for(;d>e&&!(e in c);)e++;if(e>=d)throw new TypeError('Reduce of empty array with no initial value');f=c[e++]}for(;d>e;e++)e in c&&(f=b(f,c[e],e,c));return f} // jshint ignore:line
/* beautify preserve:end */
