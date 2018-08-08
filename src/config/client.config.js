const Config = require('./common.js');

let instance;
module.exports = (conf) => {
  if (instance) return instance;
  instance = new Config(conf);
  return instance;
}
;
