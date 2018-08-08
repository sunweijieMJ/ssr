/**
 * 存储分装对外提供统一的方法及接口使用
 * Localstorage 存储到客户端
 */
class LocalStorageAPI {
  set(key, value) {
    try{
      return localStorage.setItem(key, value);
    } catch(e) {
      if(e.name === 'QuotaExceededError') {
        return 'Out of Memory Limit Localstorage';
      }
      return e;
    }
  }

  get(key) {
    return localStorage.getItem(key);
  }

  remove(key) {
    return localStorage.removeItem(key);
  }

  setExpire(key, value, expire) {
    let currTime = new Date().getTime();
    return self.set(key, JSON.stringify({val: value, time: currTime + expire}));
  }

  getExpire(key) {
    let val = self.get(key);
    let dataObj = JSON.parse(val);
    if(new Date().getTime() - dataObj.time > 0) {
      return dataObj.val;
    } else {
      return '';
    }
  }
}

export {LocalStorageAPI};
