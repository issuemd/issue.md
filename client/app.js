import config from './config.es6'

var loaded = ko.observable(false);

ko.applyBindings({
    loaded: loaded
});


$.ajax({
	method: 'GET',
    url: config.server_uri + 'config',
    headers: {
    	'content-type': 'application/json'
    }
}).then(function(data) {
	console.log(data);
	loaded(true);
});
