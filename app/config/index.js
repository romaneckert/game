const dotenv = require('dotenv');

// write .env file to process.env
const result = dotenv.config({ path: __dirname + '/.env' });
if (result.error) throw result.error;

let requiredEnvironementVariables = [
    'SERVER_PORT',
    'SECRET',
    'MONGO_DB',
    'USER_TOKEN_EXPIRES'
];

for(let variable of requiredEnvironementVariables) {
    if('string' !== typeof process.env[variable] || process.env[variable].length === 0) {
        throw new Error('environment variable ' + variable + ' does not exists');
    }
}

const config = {
    serverPort: parseInt(process.env.SERVER_PORT),
    secret: process.env.SECRET,
    mongoDB: process.env.MONGO_DB,
    userTokenExpires: parseInt(process.env.USER_TOKEN_EXPIRES)
}

module.exports = config;
