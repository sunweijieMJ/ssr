import axios from 'axios';
import jsonp from 'jsonp';
import linsign from '../utils/signFun';

// axios 配置
const Axios = axios.create({
  timeout: 2000,
  responseType: 'json',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
});

function apiAxios(method, url, params) {
  const baseURL = global.initConfig.clientApiHost;
  return new Promise((resolve, reject) => {
    Axios({
      baseURL,
      method,
      url,
      params: method === 'GET' || method === 'DELETE' ? params : null,
      data: method === 'POST' || method === 'PUT' ? params : null
    }).then((res) => {
      if (res.data.success === true || res.data.code === 200 || res.status === 200 || res.data.code === '00006') {
        resolve({status: true, message: 'success', data: res.data.data});
      } else {
        reject({status: false, message: res.data.message, data: null});
      }
    }).catch((err) => {
      if (err) console.warn(err);
      reject({status: false, message: '接口异常', data: null});
    });
  });
}

const outApi = {
  get: (url, params) => {
    params.__platform = 'm';
    params.sign = linsign.signHash(url, params);
    return apiAxios('GET', url, params);
  },
  post: (url, params) => {
    url = url + `?lh_authinfo=undefined&__platform=m&sign=${linsign.resignHash(params)}`;
    return apiAxios('POST', url, params);
  },
  put: (url, params) => {
    return apiAxios('PUT', url, params);
  },
  delete: (url, params) => {
    return apiAxios('DELETE', url, params);
  },
  jsonp: (url, params, option) => {
    let _url = root + url;
    params.sign = linsign.signHash(url, params);
    _url += (_url.indexOf('?') < 0 ? '?' : '&') + linsign.urlConcat(params);
    return new Promise((resolve, reject) => {
      jsonp(_url, option, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  }
};

export default outApi;
