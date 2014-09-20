var express, app;

express = require('express');
app = express();
app.use('/', express.static(__dirname + '/www'));
app.listen(process.env.PORT);

module.exports = app;
