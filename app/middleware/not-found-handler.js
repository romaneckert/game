const logger = require('../service/app-logger');

module.exports = (req, res, next) => {
    res.status(404)
    res.render('home/404')
}
