var config = { client: ko.observable(require('./config.js')), server: ko.observable(null) },
    loaded = ko.observable(false);

ko.applyBindings({
    config: config,
    loaded: loaded
});

$.ajax({
    method: 'GET',
    url: config.client().server_uri + 'config',
    headers: {
        'content-type': 'application/json'
    }
}).then(function(data) {
    config.server(data);
    console.log(ko.toJS(config));
    loaded(true);
});
