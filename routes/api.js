var express = require('express');
var router = express.Router();

var bCrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

var exampleData = require('../example');

router.get('/register', function(req, res) {
	res.send('hello world');
});

router.post('/login', function(req, res) {
	
});

router.get('/example', function(req, res) {
	res.send(exampleData);
});

module.exports = router;