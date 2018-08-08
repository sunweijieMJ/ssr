/**
 * 存储分装对外提供统一的方法及接口使用
 * sessionStorage 存储到客户端
 */
class SessionStorageAPI {

  set(key, value) {
    return sessionStorage.setItem(key, value);
  }

  get(key) {
    return sessionStorage.getItem(key);
  }

  remove(key) {
    return sessionStorage.removeItem(key);
  }
}
export {SessionStorageAPI};
