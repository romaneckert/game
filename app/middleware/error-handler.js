const logger = require('../service/app-logger');

module.exports = (err, req, res, next) => {

    logger.error(err.stack);

    console.log(err);

    res.status(500)
    res.render('error', { error: err })
}
