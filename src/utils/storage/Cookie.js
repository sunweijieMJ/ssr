/**
 * 存储分装对外提供统一的方法及接口使用
 * Cookie 存储到客户端
 */
class CookieAPI {
  set(key, value, expire = 3600, path = '/') {
    let date = new Date();
    date.setSeconds(date.getSeconds() + expire);
    return document.cookie = key + '=' + escape(value) + '; expires=' + date.toGMTString() + '; Path=' + path;
  }

  get(key) {
    if (document.cookie.length > 0){
      let c_start = document.cookie.indexOf(key + '=');
      if (c_start !== -1){
        c_start = c_start + key.length + 1;
        let c_end = document.cookie.indexOf(';', c_start);
        if (c_end === -1) c_end = document.cookie.length;
        return unescape(document.cookie.substring(c_start, c_end));
      }
    }
    return '';
  }

  remove(key) {
    return self.set(key, '', -1);
  }
}

export {CookieAPI};
