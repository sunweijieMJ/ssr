let devBranch = process.env.NODE_ENV === 'production' ? '' : process.argv[2];
let BranchApi = devBranch || 'default';
let HOST = 'https://api.lanehub.cn/';
if (BranchApi !== 'default') {
  HOST = `http://api.${BranchApi}.dev.weiheinc.com/`;
}

module.exports = {
  port: 3000,
  nodeENV: 'development',
  envVersion: 'GA',
  clientApiHost: HOST,
  serverApiHost: HOST,
  resouceDomain: 'https://static06.lanehub.cn',
  cookieDomain: process.env.NODE_ENV === 'production' ? '.lanehub.cn' : '',
  loggerPath: __dirname + '/../../logs/',
  traceLogUrl: 'https://m.lanehub.cn/ts.html'
};
