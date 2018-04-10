let parameters = require('./parameters');

// override parameters with environment vars if exists
for(let key in parameters) {
    if('string' === typeof process.env[key] && process.env[key].length > 0) {
        parameters[key] = process.env[key];
    }
}

// check if alle required parameters exists
let requiredParameters = [
    'SERVER_PORT',
    'SECRET',
    'MONGO_DB',
    'USER_TOKEN_EXPIRES'
];

for(let key of requiredParameters) {
    if('undefined' === typeof parameters[key]) {
        throw new Error('parameter "' + key + '" does not exists');
    }
}

// define config from parameters with typecasting
const config = {
    serverPort: parseInt(parameters.SERVER_PORT),
    secret: parameters.SECRET,
    mongoDB: parameters.MONGO_DB,
    userTokenExpires: parseInt(parameters.USER_TOKEN_EXPIRES)
}

module.exports = config;
