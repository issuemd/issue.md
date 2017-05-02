// require core node dependencies
const { parse } = require('url')

// require external dependencies
const { send } = require('micro')
const next = require('next')

// set dev/prod flag
const dev = process.env.NODE_ENV !== 'production' && !process.env.NOW

// bootstrap next.js app
let nextReady = false
const app = next({ dev })
const handle = app.getRequestHandler()
app.prepare().then(() => { nextReady = true })

// configure micro-rest-fs router
const match = require('fs-router')(__dirname + '/api')

// export micro request handler
module.exports = async (req, res) => {
  // if request header is application/json, handle as api from routed micro services
  // else handle with next app (or send 503 error until next app warmed up)
  if (req.headers['content-type'] === 'application/json') {
    // get matched handler for request and execute
    // else send 404 error
    const matched = match(req)
    if (matched) {
      return await matched(req, res)
    } else {
      return send(res, 404, { error: 'Not found' })
    }
  } else {
    return nextReady ? handle(req, res, parse(req.url, true)) : send(res, 503, { error: 'warming up server' })
  }
}
