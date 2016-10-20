'use strict';

export function created(collection, val) {
    /*## created
        - collection {Issuemd}
        returns => array of created dates of issues in collection

      ## created
        - collection {Issuemd}
        - val {String}
        returns => sets created date for issues in collection
    */
    if (!!val) {
        return collection.attr({ created: val });
    } else {
        return collection.map(issue => issue.attr('created'));
    }

}

export function id(collection, val) {
    /*## id
        - collection {Issuemd}
        returns => array of ids of issues in collection

      ## id
        - collection {Issuemd}
        - val {String}
        returns => sets id for issues in collection
    */
    if (!!val) {
        return collection.attr({ id: val });
    } else {
        return collection.map(issue => issue.attr('id'));
    }
}

// TODO: exception if id is not string
export function byID(collection, id) {
    /*## collection.byID
        - collection {Issuemd}
        - id {String} issue id to filter collection by
        returns => collection filtered by id
    */
    return collection.filter(issue => issue.attr('id') === id);
}
