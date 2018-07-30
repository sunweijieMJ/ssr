const Config = require('./common.js')

let instance
module.exports = function(conf) {
  if (instance) {
      return instance
  }
  instance = new Config(conf)
  return instance
}