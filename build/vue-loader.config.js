const utils = require('./utils')
const config = require('./config')
const isProd = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProd
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  preserveWhitespace: false,
  extractCSS: isProd,
  loaders: utils.cssLoaders({
    sourceMap: isProd ?
      config.build.productionSourceMap :
      config.dev.cssSourceMap,
    extract: isProd
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
