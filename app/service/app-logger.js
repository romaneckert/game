const winston = require('winston');
const fs = require('./fs');
const pathToLogs = __dirname + '/../../logs/app/';
const path = require('path');

fs.ensureDirExists(pathToLogs);

const logFormat = winston.format.printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

let format =  winston.format.combine(
    winston.format.label({ label: 'app' }),
    winston.format.timestamp(),
    winston.format.simple(),
    logFormat
);

let fileTransportDebug = new winston.transports.File({
    filename: path.join(pathToLogs, 'debug.log'),
    format: format,
    level: 'debug'
});

let fileTransportInfo = new winston.transports.File({
    filename: path.join(pathToLogs, 'info.log'),
    format: format,
    level: 'info'
});

let fileTransportError = new winston.transports.File({
    filename: path.join(pathToLogs, 'error.log'),
    format: format,
    level: 'error'
});

let logger = winston.createLogger({
    level: 'debug',
    transports: [
        fileTransportDebug,
        fileTransportInfo,
        fileTransportError
    ]
});

// log to console
if (process.env.NODE_ENV !== 'production') {

    let consoleTransport = new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    });

    logger.add(consoleTransport);
}

module.exports = logger;
