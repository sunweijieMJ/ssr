const log4js = require('log4js');

function getlogger(loggerPath, name) {
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
  return log4js.getLogger(name);
}
module.exports = {
  getlogger
};
