const winston = require('winston');
const fs = require('./fs');
const pathToLogs = __dirname + '/../../logs/';
const path = require('path');

fs.ensureDirExists(pathToLogs);

const logFormat = winston.format.printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

let format =  winston.format.combine(
    winston.format.label({ label: 'app' }),
    winston.format.timestamp(),
    winston.format.simple(),
    logFormat
);

let logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.File({
            filename: path.join(pathToLogs, 'info.log'),
            format: format,
            level: 'info'
        }),
        new winston.transports.File({
            filename: path.join(pathToLogs, 'error.log'),
            format: format,
            level: 'error'
        }),
        new winston.transports.File({
            filename: path.join(pathToLogs + 'debug.log'),
            format: format
        })
    ]
  });

// log to console
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

module.exports = logger;
