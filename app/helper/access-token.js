const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports = (user, res) => {
    let accessToken = jwt.sign({
        data: {
            user: user
        }
    },
    config.secret,
    {
        expiresIn: config.userTokenExpires
    });

    res.cookie('access_token', accessToken, {
        expires: new Date(Date.now() + config.userTokenExpires * 1000),
        httpOnly: true,
        sameSite: 'Strict',
        secure: true,
    });
}
