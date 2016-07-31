# issue.md website

work in progress...

# development

First time setup via `npm i`.

Development server via `npm start` served up on **port 8080** (will try next port if already in use).

## server development

Edit files in `server` to see changes to the api server - will require manual server restart after changes.

The server is a minimal express server which includes middleware for app logic.

## client development

Edit files in `client` to see changes to the client livereloaded in the browser.

The build tools are based on browserify giving you nodejs style `require`, and includes (amongst other browserify plugins) [brfs](https://www.npmjs.com/package/brfs) for nodejs style `fs` (inlining static files into built js) and [bubelify](https://www.npmjs.com/package/bubleify) for es6 code.

The client's module system is es6 modules, with the exception of the config files which are loaded via require and redirectify to enable dynamic switching between production and development config files.

## build and deploy

The server does not require a build step, and is deployed via the `npm run deploy-server` command as a [now.sh](http://now.sh/) instance at a random url which is then written to the `SERVER_URI` file (and perhaps copied to the clipboard).

The client is built via `npm run build-client` which copies assets from the client folder, and builds the `app.js` file.

Assuming correct access rights, the client can be deployed to beta via `npm run deploy-client-beta` which publishes it out to [issuemd.surge.sh](https://issuemd.surge.sh) via the [surge cli](http://surge.sh/).

Again, assuming correct access rights, the client can be deployed to preprod via `npm run deploy-client-preprod` which pushes (via git commit and push) out to [issuemd.github.io/issue.md](https://issuemd.github.io/issue.md/) as a github pages instance that should exactly mimic the prodution environment.

Obviously, assuming correct access rights, the client can be deployed to production via `npm run deploy-client-prod`. This simply pushes the gh-pages branch of this repo to the master branch of the [issuemd.github.io](https://issuemd.github.io/) repo, triggering a github pages build and deploy.