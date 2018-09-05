const log4js = require('log4js');

class Logger {
  constructor(loggerPath) {
    log4js.configure({
      appenders: {
        log: {
          type: 'dateFile',
          filename: loggerPath + 'log',
          pattern: '-yyyy-MM-dd.log',
          alwaysIncludePattern: true
        }
      },
      categories: {
        default: {
          appenders: ['log'],
          level: 'debug'
        },
        log: {
          appenders: ['log'],
          level: 'all'
        }
      }
    });
  }

  getlogger(name) {
    return log4js.getLogger(name);
  }
}

let instance;
export default function createLogger(loggerPath, name) {
  if (instance) {
    return instance;
  }
  instance = new Logger(loggerPath, name);
  return instance.getlogger(name);
}
