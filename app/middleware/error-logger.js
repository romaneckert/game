const logger = require('../service/app-logger');

module.exports = (err, req, res, next) => {
    logger.error(err.stack);
    next(err);
}
