const winston = require('winston');
const fs = require('./fs');
const pathToLogs = __dirname + '/../../logs/server/';
const path = require('path');

fs.ensureDirExists(pathToLogs);

const logFormat = winston.format.printf(info => {
    return `${info.timestamp} ${info.message}`;
});

let format =  winston.format.combine(
    winston.format.label({ label: 'app' }),
    winston.format.timestamp(),
    winston.format.simple(),
    logFormat
);

let fileTransportDebug = new winston.transports.File({
    filename: path.join(pathToLogs, 'access.log'),
    format: format,
    level: 'info'
});

let logger = winston.createLogger({
    level: 'info',
    transports: [
        fileTransportDebug
    ]
});

module.exports = logger;
