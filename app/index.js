#!/usr/bin/env node
const express = require('express');
const app = express();
const helmet = require('helmet');

// activate helmet
app.use(helmet());

// serve static files
app.use(express.static(__dirname + '/../public'));

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

// listen on port 3000
app.listen(3000);