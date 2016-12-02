/* global $,ko */

'use strict'

import clientConfig from './config.json'

var config = {
  client: ko.observable(clientConfig),
  server: ko.observable(null)
}

var loaded = ko.observable(false)

ko.applyBindings({
  config: config,
  loaded: loaded
})

$.ajax({
  method: 'GET',
  url: config.client().serverURI + 'config',
  headers: {
    'content-type': 'application/json'
  }
}).then(function (data) {
  config.server(data)
  console.log(ko.toJS(config))
  loaded(true)
})
