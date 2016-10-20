## issue md

es2015 rework of issuemd

## setup and run dev environment

    npm start

This command should install all dependencies, start a dev server and run all tests, watch for changes running tests and livereloading browser.

Then open http://localhost:8080/ and edit files in `src` and `www` to see changes.

## test

Unit tests in the `test/unit` folder are run with `npm test` command, or via watcher setup from `npm start` command.

When working on coverage, you can run `npm run watch:coverage` to get spec report and code coverage livereloading in console. If the server is running, you can also view the [HTML coverage report](http://localhost:8080/reports/coverage/).

There is a `test/unit/_env.js` file which should be executed before other tests in order to expose `assert` and `sinon` globally.

There is a linting test command `npm run test:lint` which tests javascript code in `src` and `test` against config rules in `.jshint` including cyclomatic complexity (which can be overridden on a per function basis with a directive in the comments like: `// jshint maxcomplexity:15`).

## server

If you are working on the development express server, you can run a watch task to restart the server on changes...

    node_modules/.bin/nodemon scripts/express.js