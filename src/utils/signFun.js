import md5 from 'js-md5';
import interceptorConf from '../interceptor/Global';
function objKeySort(arys) {
  // 先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  let newkey = Object.keys(arys).sort();
  let newObj = {};
  for(let i = 0; i < newkey.length; i++) {
    newObj[newkey[i]] = arys[newkey[i]];
  }
  return newObj;
}
function signHash(url, data, userId) {
  let _data = JSON.parse(JSON.stringify(data));
  _data.sign = '';
  if (url !== 'validate_code' && url !== 'register') {
    _data.user_id = decodeURIComponent(userId || '');
  }
  let params = objKeySort(_data);
  let arr = [];
  let _params = '';
  let locks = '';
  for (let key in params) {
    _params = params[key];
    if (Array.isArray(_params)){
      let a = _params.reduce((l, r) => {
        return  JSON.stringify(l) + JSON.stringify(r);
      });
      arr.push(a);
    }else{
      arr.push(_params);
    }
  }
  locks = arr.join('') + interceptorConf.sign_key;
  return md5(locks);
}

function resignHash(data, userId) {
  let locks = JSON.stringify(data) + decodeURIComponent(userId) + interceptorConf.sign_key;
  return md5(locks);
}

function urlConcat(data) {
  let url = '';
  for (let k in data) {
    let value = data[k] !== undefined ? data[k] : '';
    url += '&' + k + '=' + encodeURIComponent(value);
  }
  return url ? url.substring(1) : '';
}
export default {signHash, resignHash, urlConcat};
