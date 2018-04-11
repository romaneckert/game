module.exports = {
    config: require('../config'),
    service: {
        accessToken : require('../service/access-token'),
        bcrypt: require('bcrypt'),
        logger: require('../service/logger')
    },
    model: {
        user: require('../model/user')
    }
}
