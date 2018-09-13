let BranchApi = process.argv.splice(2)[0] || 'default';
let HOST = 'http://api.mall.dev.weiheinc.com/';
if (BranchApi !== 'default') {
  HOST = `http://api.${BranchApi}.dev.weiheinc.com/`;
} else {
  HOST = 'https://api.lanehub.cn/';
}

module.exports = {
  port: 3000,
  nodeENV: 'development',
  envVersion: 'GA',
  clientApiHost: HOST,
  serverApiHost: HOST,
  resouceDomain: 'https://static.lanehub.cn',
  cookieDomain: process.env.NODE_ENV === 'production' ? '.lanehub.cn' : '',
  loggerPath: __dirname + '/../../logs/',
  traceLogUrl: 'https://m.lanehub.cn/ts.html'
};
