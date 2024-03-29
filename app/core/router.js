const roles = require('../middleware/roles');
const routes = require('../config/routes');

module.exports = (app) => {

    for(routePath in routes) {

        let route = routes[routePath];

        if('object' === typeof route.roles && 0 < route.roles.length) {
            app.use(routePath, roles(route.roles));
        }

        if('object' === typeof route.method) {
            for(let method of route.method) {
                app[method](routePath, route.controller);
            }
        } else {
            app[route.method](routePath, route.controller);
        }
    }
}
