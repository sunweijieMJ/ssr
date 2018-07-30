module.exports = {
    port: 3000,
    nodeENV: 'development',
    clientApiHost:'http://api.release.dev.weiheinc.com',
    serverApiHost:'https://api.lanehub.cn',
    cookieDomain: process.env.NODE_ENV === 'production' ? '.lanehub.cn' : ''
}
