import axios from 'axios';
import jsonp from 'jsonp';
import linsign from '../utils/signFun';
import CreateRequest from '../utils/request';

const request = new CreateRequest();

// axios 配置
const Axios = axios.create({
  timeout: 10000,
  responseType: 'json',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    'Cookie': `siteType=${request.getSiteType()};osType=${request.getOsType()}`
  }
});

function apiAxios(method, url, params, success, failure) {
  const baseURL = global.config.getServerApiHost();
  return Axios({
    baseURL,
    method,
    url,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    data: method === 'POST' || method === 'PUT' ? params : null
  }).then((res) => {
    if (res.data.success === true || res.data.code === 200 || res.status === 200) {
      if (success) {
        success(res.data);
      } else if (failure) {
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
    params.__platform = 'm';
    params.sign = linsign.signHash(url, params);
    return apiAxios('GET', url, params, success, failure);
  },
  post: (url, params, success, failure) => {
    url = url + `?lh_authinfo=undefined&__platform=m&sign=${linsign.resignHash(params)}`;
    return apiAxios('POST', url, params, success, failure);
  },
  put: (url, params, success, failure) => {
    return apiAxios('PUT', url, params, success, failure);
  },
  delete: (url, params, success, failure) => {
    return apiAxios('DELETE', url, params, success, failure);
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
