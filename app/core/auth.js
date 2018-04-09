const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    try {

        if('string' === typeof req.cookies.access_token) {

            jwt.verify(req.cookies.access_token, config.secret, (err, decoded) => {
                if(!err && 'object' === typeof decoded.data.user && null !== decoded.data.user) {
                    req.user = decoded.data.user;
                }
            });

        }

    } catch (err) {
        console.error(err);
    }

    next();
}
