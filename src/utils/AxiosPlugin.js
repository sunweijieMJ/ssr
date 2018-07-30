import axios from 'axios';
// import interceptorConf from '../interceptor/Global';
import linsign from './signFun';
import router from '../router';
import jsonp from 'jsonp';
const storeAPI = require('../utils/storage/StorageApi')();
const  baseURL = process.env.API_ROOT;

const Axios = axios.create({
  baseURL,
  timeout: 10000,
  responseType: 'json',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
});

Axios.interceptors.request.use(config => {
  if(storeAPI.get('token')) {
    config.headers.Authorization = storeAPI.get('token');
  }
  if(['PUT', 'POST', 'put', 'post'].indexOf(config.method) === -1) {
    config.data = null;
  }
  if(['GET', 'DELETE', 'get', 'delete'].indexOf(config.method) === -1) {
    config.params = null;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

Axios.interceptors.response.use(res => {
  if(res && res.status !== 200) {
    return Promise.reject(res.message);
  }
  return res;
}, error => {
  if(error.response) {
    switch(error.response.status) {
      case 404:
        router.push({path: '/error/404'});
        break;
      case 403:
        router.push({path: '/Login'});
        break;
      default:
        router.push({path: '/error/404'});
        break;
    }
  } else {
    router.push({path: '/Login'});
  }
});

function fetch(method, url, params, data, success, failure) {
  return Axios({
    method,
    url,
    params,
    data
  }).then((res) => {
    if (res.data.success === true || res.data.code === 200 || res.status === 200) {
      if (success) {
        success(res.data);
      } else if(failure) {
        failure(res.data);
      }
    } else {
      if (failure) {
        failure(res.data);
      } else {
        console.warn('error: ' + JSON.stringify(res.data));
      }
    }
  }).catch((err) => {
    if (err) console.warn(err);
  });
}
const outApi = {
  get: (url, params, success, failure) => {
    params.sign = linsign.signHash(url, params, storeAPI.get('user_id'));
    if (storeAPI.get('user_id')){
      params.user_id = decodeURIComponent(storeAPI.get('user_id'));
    }
    return fetch('GET', url, params, {}, success, failure);
  },
  post: (url, data, success, failure) => {
    url = url + `?user_id=${storeAPI.get('user_id')}&sign=${linsign.resignHash(data, storeAPI.get('user_id'))}`;
    return fetch('POST', url, {}, data, success, failure);
  },
  put: (url, params, success, failure) => {
    return fetch('PUT', url, params, success, failure);
  },
  delete: (url, params, success, failure) => {
    return fetch('DELETE', url, params, success, failure);
  },
  jsonp: (url, params, option) => {
    let _url = root + url;
    params.sign = linsign.signHash(url, params, storeAPI.get('user_id'));
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
