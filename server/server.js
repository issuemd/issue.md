var app = require('express')();

require('./api-middlewares.js').forEach(function(middleware){
    app.use(middleware);
});

app.listen(8081, '0.0.0.0');
