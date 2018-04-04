#!/usr/bin/env node

// load required core libs
const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const auth = require('./core/auth');

// write .env file to process.env
const result = dotenv.config({path: __dirname + '/.env'});
if(result.error) throw result.error;

// create express app
const app = express();

// activate helmet
app.use(helmet());

// serve static files
app.use(express.static(__dirname + '/../public'));

// compress all responses
//app.use(compression());

// authentification
app.use(auth);

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
app.post('/user/sign-in/', controller.user.login)

// listen on port 3000
app.listen(3000);