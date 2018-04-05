const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        let token = req.headers.cookie.split('=')[1];

        data = jwt.verify(token, process.env.SECRET);

        console.log(data);

    } catch (err) {
        console.error(err);
        next();
    }

    next();
}
