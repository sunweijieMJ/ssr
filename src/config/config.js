module.exports = {
  port: 3000,
  nodeENV: 'development',
  clientApiHost: 'http://api.lanehub.cn',
  serverApiHost: 'https://api.lanehub.cn',
  resouceDomain: 'https://static.lanehub.cn',
  cookieDomain: process.env.NODE_ENV === 'production' ? '.lanehub.cn' : ''
};
