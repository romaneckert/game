const winston = require('winston');
const fs = require('./fs');
const pathToLogs = __dirname + '/../../logs/';
const pathToLogsApp = pathToLogs + 'app/';

fs.ensureDirExists(pathToLogsApp);

const logFormat = winston.format.printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

const app = winston.createLogger({
    format: winston.format.combine(
        winston.format.label({ label: 'app' }),
        winston.format.timestamp(),
        logFormat
    ),
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: pathToLogsApp + 'info.log',
            handleExceptions: true,
            json: false,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: true
        }),
        new winston.transports.File({
            level: 'error',
            filename: pathToLogsApp + 'error.log',
            handleExceptions: true,
            json: false,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: true
        }),
        new winston.transports.Console(),
    ]
});

module.exports = {
    app : app
}
