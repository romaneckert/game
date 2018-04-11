const logger = require('../service/app-logger');

module.exports = (err, req, res, next) => {
    logger.error(err.stack);
    res.status(500)
    res.render('home/error', { error: err })
}
