#!/usr/bin/env node
var express = require('express');
var app = express();

// configure view
app.set('views', __dirname + '/view/')
app.set('view engine', 'pug');

// require controller
const controller = {
    home: require('./controller/home'),
    user: require('./controller/user')
};

// define routing
app.get('/', controller.home.index);

// serve static files
app.use(express.static(__dirname + '/../public'));

// listen on port 3000
app.listen(3000);