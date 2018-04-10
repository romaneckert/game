#!/usr/bin/env node

// load required core libs
const config = require('./config');
const compression = require('compression');
const express = require('express');
const cookies = require('cookie-parser')
const helmet = require('helmet');
const bodyParser = require('body-parser');
const auth = require('./middleware/auth');
const https = require('https');
const fs = require('fs');
const mongoose = require('mongoose');
const router = require('./core/router');
const db = mongoose.connection;

// create express app
const app = express();

// compress all responses
app.use(compression());

// activate helmet
app.use(helmet());

// parse cookies
app.use(cookies());

// body parser
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files
app.use(express.static(__dirname + '/../public'));

// authentification
app.use(auth);

// configure view
app.set('views', __dirname + '/view/')
app.set('view engine', 'pug');

// register routes
router(app);

// create https server
const server = https.createServer({
    key: fs.readFileSync(__dirname + '/key.pem'),
    cert: fs.readFileSync(__dirname + '/cert.pem')
}, app);

// connect to mongodb
mongoose.connect('mongodb://localhost/' + config.mongoDB);

db.on('error', (err) => {
    console.log('can not connect to db', err);
});

db.once('open', () => {
    console.info('connected to mongodb: ' + config.mongoDB);
    server.listen(config.serverPort, () => {
        console.info('server started at port: ' + config.serverPort);
    });
});


