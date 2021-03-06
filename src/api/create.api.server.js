import axios from 'axios';
import jsonp from 'jsonp';
import linsign from '../utils/signFun';
import CreateRequest from '../utils/request';

const request = new CreateRequest();

// axios 配置
const Axios = axios.create({
  timeout: 20000,
  responseType: 'json',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    'Cookie': `siteType=${request.getSiteType()};osType=${request.getOsType()}`
  }
});

function apiAxios(method, url, params) {
  const baseURL = global.config.getServerApiHost();
  let start = new Date().getTime();
  return new Promise((resolve, reject) => {
    let options = {
      baseURL,
      method,
      url,
      params: method === 'GET' || method === 'DELETE' ? params : null,
      data: method === 'POST' || method === 'PUT' ? params : null
    };
    Axios(options).then((res) => {
      let {status} = res;
      let end = new Date().getTime();
      global.log.infoLogger('apisuccess', '|status:', JSON.stringify(status), '|request time:', end - start, 'ms |request:', JSON.stringify(options), '\n');

      if (res.data.code === '00006') {
        resolve({status: true, message: 'success', data: res.data.data});
      } else {
        resolve({status: false, message: res.data.message, data: res.data.data});
      }
    }).catch((err) => {
      if (err) console.warn(err);
      let status = err;
      let end = new Date().getTime();
      global.log.infoLogger('apierror', '|status: 500|timeout ', '|request time:', end - start, 'ms |request:', JSON.stringify(options), JSON.stringify(status), '\n');
      resolve({status: false, message: '接口错误', data: null});
      // reject({status: false, message: '接口错误', data: null});
    });
  });
}

const outApi = {
  get: (url, params) => {
    params.__platform = 'm';
    let appType = request.getAppType();
    if(appType) params.app = appType;
    params.sign = linsign.signHash(url, params);
    return apiAxios('GET', url, params);
  },
  post: (url, params, query) => {
    url = url + `${url.indexOf('?') === -1 ? '?' : '&'}lh_authinfo=undefined&__platform=m${query ? '&' + linsign.urlConcat(query) : ''}`;
    let appType = request.getAppType();
    if(appType) url += '&app=' + appType;
    url = url + `&sign=${linsign.resignHash(url, params)}`;
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
