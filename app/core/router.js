const roles = require('./roles');
/*
app.post('/user/sign-in/', controller.user.signIn);
app.post('/user/sign-up/', controller.user.signUp);
app.get('/user/sign-out/', controller.user.signOut);
*/

const routes = {
    '/' : {
        method: 'get',
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

module.exports = (app) => {

    for(routePath in routes) {

        let route = routes[routePath];

        if('object' === typeof route.roles && 0 < route.roles.length) {
            app.use(routePath, roles(route.roles));
        }

        app[route.method](routePath, route.controller);

    }
}
