module.exports = {
    config: require('../config'),
    service: {
        accessToken : require('../service/access-token'),
        brypt: require('bcrypt'),
    },
    model: {
        user: require('../model/user')
    }
}
