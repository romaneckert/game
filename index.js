var express = require('express');
var app = express();

// controller
const contoller = {
    home: require('./controller/home'),
    user: require('./controller/user')
};

app.get('/', controller.home.index);