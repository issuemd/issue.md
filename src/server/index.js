'use strict'

const fs = require('fs')
// require('isomorphic-fetch')
// require('es6-promise').polyfill()

const packageJson = require('../../package.json')
const { parse } = require('url')
const nextServer = require('next')
const path = require('path')
const express = require('express')
var argv = require('minimist')(process.argv.slice(2))

const config = {
  dev: !process.env.NOW_URL,
  port: argv.port || 3000,
  host: '0.0.0.0',
  docs: ['docs', 'coverage']
}
console.log(config)

const app = nextServer({
  dev: config.dev,
  dir: path.join(__dirname, '..', 'www')
})

const handle = app.getRequestHandler()

const IssuemdBuilder = require('./build-issuemd.js')
let IssuemdCode
let issuemd

app.prepare().then(() => {
  const server = express()
  IssuemdBuilder().then(code => {
    IssuemdCode = code
    // TODO: more elegant way to get local issuemd instance
    issuemd = eval(code + ';issuemd') // eslint-disable-line no-eval
  }).then(() => {
    if (config.dev) {
      // server.use(require('./dev-middleware.js'))
      config.docs.forEach(function (dir) {
        server.use('/' + dir, express.static(path.join(__dirname, '..', '..', dir)))
      })
    }
    server.use((req, res, next) => {
      if (req.url === '/config') {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({
          version: packageJson.version
        }))
      } else {
        next()
      }
    })
    server.use((req, res, next) => {
      if (req.url === '/issuemd.js') {
        res.end(IssuemdCode)
      } else {
        next()
      }
    })
    server.use((req, res, next) => {
      if (req.url === '/issuemd.min.js') {
        res.setHeader('Content-Type', 'application/js')
        res.end(fs.readFileSync(path.join(__dirname, '..', '..', 'issuemd.min.js')))
      } else {
        next()
      }
    })
    server.use((req, res, next) => {
      // TODO: replace with services exposing issuemd transforms
      if (req.url === '/issues') {
        res.end(issuemd({title: 'awesome'}).md())
      } else {
        next()
      }
    })
    server.use((req, res) => {
      const parsedUrl = parse(req.url, true)
      // const { pathname, query } = parsedUrl

      // if (pathname === '/a') {
      //   app.render(req, res, '/b', query)
      // } else if (pathname === '/b') {
      //   app.render(req, res, '/a', query)
      // } else {
      handle(req, res, parsedUrl)
      // }
    })
    server.listen(config.port, err => {
      if (err) { throw err }
      console.log(`Tune in to radio localhost:${config.port}`)
      // // TODO: remove this test of isomorphic fetch and Promise
      // fetch('http://localhost:3000/issues').then(r=>r.text()).then(txt => console.log(txt))
      // let p1 = new Promise((resolve, reject) => {
      //   resolve('cool')
      // })
      // p1.then(res => console.log(res))
    })
  })
})
