var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');

var port = 3005;

app.use(bodyParser.json());

app.use('/', require('./routes/api'));

app.listen(port);               
console.log('Serving on port ' + port);