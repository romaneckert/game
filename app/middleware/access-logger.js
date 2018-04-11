const config = require('../config');
const jwt = require('jsonwebtoken');
const logger = require('../service/server-logger');

module.exports = (req, res, next) => {

    logger.info(req.method + ': ' + req.url);

    next();
}
