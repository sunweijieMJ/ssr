const log4js = require('log4js');

class LaneLogger {
  constructor(loggerPath) {
    log4js.configure({
      appenders: {
        log: {
          type: 'dateFile',
          filename: loggerPath + 'log',
          pattern: '-yyyy-MM-dd.log',
          alwaysIncludePattern: true,
          maxLogSize: 104800,
          backups: 100
        },
        error: {
          type: 'file',
          filename: loggerPath + 'error-ssr.log',
          maxLogSize: 104800,
          backups: 100
        }
      },
      categories: {
        default: {appenders: ['log'], level: 'debug'},
        log: {appenders: ['log'], level: 'all'},
        error: {appenders: ['error'], level: 'error'}
      },
      replaceConsole: true
    });
  }
  formatError(ctx, err, costTime) {
    let method = ctx.method;
    let url = ctx.url;
    let clientIP = ctx.request.ips;
    let userAgent = ctx.header.userAgent;
    return [method, url, clientIP, costTime, err, userAgent];
  }

  formatRes(ctx, costTime) {
    let method = ctx.method;
    let url = ctx.url;
    let clientIP = ctx.request.ips;
    let response = ctx.response;
    return [method, url, clientIP, costTime + ' ms', response];
  }

  errLogger(ctx, error, resTime) {
    if(ctx && error) {
      return;
    }
    log4js.getLogger('error').error(JSON.stringify(this.formatError(ctx, error, resTime)));
  }

  resLogger(ctx, resTime) {
    if(!ctx) {
      return;
    }
    log4js.getLogger('response').info(JSON.stringify(this.formatRes(ctx, resTime)));
  }

  infoLogger() {
    log4js.getLogger('info').info([...arguments].join(' '));
  }
}
let instance;
module.exports =  (loggerPath) => {
  if(instance) return instance;
  instance = new LaneLogger(loggerPath);
  return instance;
};
