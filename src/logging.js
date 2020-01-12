const config = require('config');
const winston = require('winston');

const logger = winston.createLogger({
  level: config.get('logging.level'),
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.splat(),
    winston.format.printf(({
      level, message, label, timestamp,
    }) => `${timestamp} [${label}] ${level}: ${message}`),
  ),
  handleExceptions: true,
  exitOnError: true,
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console());
} else {
  // production logstash format
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.timestamp(),
      winston.format.logstash(),
    ),
  }));
}

module.exports = logger;
