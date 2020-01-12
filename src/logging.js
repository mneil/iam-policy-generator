const config = require('config');
const winston = require('winston');

// create a logger that we'll use as the default
const logger = winston.createLogger({
  level: config.get('logging.level'),
  format: winston.format.combine(
    winston.format.colorize(), // default pretty colors
    winston.format.timestamp(), // add a timestamp
    winston.format.splat(), // string interpolate %s and %d
    winston.format.printf(({ // format the output to be what we want
      level, message, label, timestamp,
    }) => `${timestamp} [${label}] ${level}: ${message}`),
  ),
  handleExceptions: true,
  exitOnError: true,
});

if (process.env.NODE_ENV !== 'production') {
  // add a console transport for non-production logging
  logger.add(new winston.transports.Console());
} else {
  // add a production logstash format log
  logger.add(new winston.transports.Console({
    // override the default (human readable) format
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.timestamp(),
      winston.format.logstash(),
    ),
  }));
}

module.exports = logger;
