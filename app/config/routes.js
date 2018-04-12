module.exports = {
    '/' : {
        method: ['get', 'post'],
        controller: require('../controller/home/index')
    },

    //admin routes
    '/admin/' : {
        method: 'get',
        controller: require('../controller/admin/index'),
        roles: ['admin']
    },

    // user routes
    '/user/overview/' : {
        method: 'get',
        controller: require('../controller/user/overview'),
        roles: ['admin', 'user']
    },
    '/user/sign-up/' : {
        method: 'post',
        controller: require('../controller/user/sign-up'),
    },
    '/user/sign-in/' : {
        method: 'post',
        controller: require('../controller/user/sign-in'),
    },
    '/user/sign-out/' : {
        method: 'get',
        controller: require('../controller/user/sign-out'),
        roles: ['admin', 'user']
    },
    '/user/password-reset/' : {
        method: 'post',
        controller: require('../controller/user/password-reset'),
        roles: ['admin', 'user']
    }
};
