module.exports = {
    config: require('../config'),
    service: {
        accessToken : require('../service/access-token'),
        bcrypt: require('bcrypt'),
    },
    model: {
        user: require('../model/user')
    }
}
