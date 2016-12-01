/* globals issuemd,_,Chance */

issuemd.fn.chance = function(qty, seed) {

    'use strict';

    var chance = new Chance(seed || 0),
        issues = [],
        issueDate = new Date();

    chance.mixin({
        lorem: (opts) => {
            var lorem = `lorem ipsum laboris duis adipisicing eu nisi esse labore ea nulla proident quis ad reprehenderit
            amet et voluptate incididunt commodo ullamco in cupidatat sed ut consequat laborum velit enim sint pariatur
            occaecat minim veniam nostrud anim sit aute do exercitation magna est dolore aliquip elit irure mollit dolor
            non officia tempor qui id fugiat sunt`.split(/[\s\n]+/);
            var sentence = chance.shuffle(lorem).slice(0, (opts || {}).words || chance.natural({ min: 12, max: 18 }));
            sentence[0] = sentence[0][0].toUpperCase() + sentence[0].slice(1);
            return sentence.join(' ');
        },
        lorempara: (opts) => {
            var para = [];
            _.times(chance.integer({
                min: (opts || {}).sentences || 3,
                max: (opts || {}).sentences || 7
            }), function() {
                para.push(chance.lorem());
            });
            return para.join('.  ') + '.';
        }
    });

    _.times(chance.integer({
        min: qty || 1,
        max: qty || 20
    }), function() {
        var issue = randomIssue(issueDate);
        issueDate = new Date(issue.original.created);
        issues.push(issue);
    });

    this.merge(issues);
    return this;

    function randomDate(min, max) {
        var stamp = chance.integer({
            min: min * 1,
            max: max * 1 || min * 1 + 1234567890
        });
        return new Date(stamp).toString();
    }

    function randomIssue(earliest) {
        var created = randomDate(earliest);
        var updateEarliest = new Date(created + 123456789);
        var issue = {
            original: {
                title: chance.lorem(),
                created: new Date(created).toISOString().replace('Z', '+0000'),
                creator: chance.name(),
                meta: [],
                body: block()
            },
            updates: _.times(chance.integer({
                min: 1,
                max: 5
            }), function() {
                var update = randomUpdate(updateEarliest);
                updateEarliest = new Date(update.modified);
                return update;
            })
        };
        return issue;
    }

    function block(max) {
        return _.times(chance.integer({
            min: 1,
            max: max || 5
        }), function() {
            return chance.random() < 0.3 ? chance.lorem() + '.' : chance.lorempara();
        }).join('\n\n');
    }

    function randomUpdate(earliest) {
        var update = {
            modified: new Date(randomDate(earliest)).toISOString().replace('Z', '+0000'),
            modifier: chance.name(),
            type: 'comment',
            body: block(3)
        };
        return update;
    }

};
