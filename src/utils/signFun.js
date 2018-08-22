import md5 from 'js-md5';
import interceptorConf from '../interceptor/Global';

// 参数排序
function objKeySort(arys) {
  let newkey = Object.keys(arys).sort();
  let newObj = {};
  for(let i = 0; i < newkey.length; i++) {
    newObj[newkey[i]] = arys[newkey[i]];
  }
  return newObj;
}

// md5加密
function signHash(url, oldparams) {
  let _oldparams = JSON.parse(JSON.stringify(oldparams));
  _oldparams.sign = '';
  _oldparams.lh_authinfo = decodeURIComponent(window.localStorage.lh_authinfo || '');
  /* oldparams.__platform='web'; */
  let params = objKeySort(_oldparams);
  let arr = [];
  let _params = '';
  let locks = '';
  for (let key in params) {
    _params = params[key];
    if (Array.isArray(_params)) {
      let a = _params.reduce((l, r) => {
        return JSON.stringify(l) + JSON.stringify(r);
      });
      arr.push(a);
    } else {
      arr.push(_params);
    }
  }
  locks = arr.join('') + interceptorConf.sign_key;
  return md5(locks);
}

// 自定义hash值
function resignHash(data, userId) {
  let locks = JSON.stringify(data) + decodeURIComponent(userId) + interceptorConf.sign_key;
  return md5(locks);
}

// url解析
function urlConcat(data) {
  let url = '';
  for (let k in data) {
    let value = data[k] !== undefined ? data[k] : '';
    url += '&' + k + '=' + encodeURIComponent(value);
  }
  return url ? url.substring(1) : '';
}

export default {signHash, resignHash, urlConcat};
