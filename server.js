var express, app;

express = require('express');
app = express();
app.use('/', express.static(__dirname + '/www'));
app.listen(process.env.PORT || 8080);
console.log('glu glu ie ie', process.env.PORT || 8080);

module.exports = app;
