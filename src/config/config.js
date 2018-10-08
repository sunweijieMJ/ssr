module.exports = {
  port: 3000,
  nodeENV: 'development',
  envVersion: 'GA',
  clientApiHost: 'https://api.lanehub.cn/',
  serverApiHost: 'https://api.lanehub.cn/',
  resouceDomain: 'https://static.lanehub.cn',
  cookieDomain: process.env.NODE_ENV === 'production' ? '.lanehub.cn' : '',
  loggerPath: __dirname + '/../../logs/',
  traceLogUrl: 'https://m.lanehub.cn/ts.html'
};
