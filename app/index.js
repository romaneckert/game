#!/usr/bin/env node

// load required core libs
const compression = require('compression');
const express = require('express');
const cookies = require('cookie-parser')
const helmet = require('helmet');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const auth = require('./core/auth');
const https = require('https');
const fs = require('fs');
const role = require('./core/role');
const mongoose = require('mongoose');
const db = mongoose.connection;

// write .env file to process.env
const result = dotenv.config({ path: __dirname + '/.env' });
if (result.error) throw result.error;

// create express app
const app = express();

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

// require controller
const controller = {
    home: require('./controller/home'),
    user: require('./controller/user'),
    admin: require('./controller/admin')
};

// public routes
app.get('/', controller.home.index);

// admin routes
app.use('/admin/dashboard', role('admin'));
app.get('/admin/dashboard', controller.admin.dashboard);

// use routes
app.use('/user/dashboard', role('user'));
app.get('/user/dashboard', controller.user.dashboard);
app.post('/user/sign-in/', controller.user.signIn);
app.post('/user/sign-up/', controller.user.signUp);
app.get('/user/sign-out/', controller.user.signOut);

// compress all responses
//app.use(compression());

// create https server
const server = https.createServer({
    key: fs.readFileSync(__dirname + '/key.pem'),
    cert: fs.readFileSync(__dirname + '/cert.pem')
}, app);

// connect to mongodb
mongoose.connect('mongodb://localhost/' + process.env.MONGODB);

db.on('error', (err) => {
    console.log('can not connect to db', err);
});

db.once('open', () => {
    console.info('connected to mongodb: ' + process.env.MONGODB);
    server.listen(process.env.SERVER_PORT, () => {
        console.info('server started at port: ' + process.env.SERVER_PORT);
    });
});


