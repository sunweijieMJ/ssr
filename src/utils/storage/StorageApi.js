/**
 * 单列模式返回对象
 * 统一封装对外的接口
 */

let instance, UseStore;
module.exports = (store) => {
  if (instance) {
    return instance;
  }
  switch(store) {
    case 'session':
      UseStore = require('./SessionStorage').SessionStorageAPI;
      break;
    case 'cookie':
      UseStore = require('./Cookie').CookieAPI;
      break;
    case 'localstorage':
      UseStore = require('./LocalStorage').LocalStorageAPI;
      break;
    default:
      UseStore = require('./SessionStorage').SessionStorageAPI;
      break;
  }
  instance = new UseStore();
  return instance;
};
