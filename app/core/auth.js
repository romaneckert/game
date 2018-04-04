let jwt = require('jsonwebtoken');
let config = require('../config/config');

module.exports = (req, res, next) => {
    try {
        let token = req.headers.cookie.split('=')[1];

        data = jwt.verify(token, config.secret);

        console.log(data);
        
    } catch(err) {
        next();
    }

    next();
}