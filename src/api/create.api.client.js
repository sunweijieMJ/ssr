import axios from 'axios';

const Axios = axios.create({
  timeout: 10000,
  responseType: 'json',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
});

export default function fetch(options) {
  options.baseURL = global.initConfig.clientApiHost;
  return new Promise(function(resolve, reject) {
    Axios(options).then(function(res) {
      let {status, data} = res;
      if (status === 200) {
        resolve(data)
      } else {
        reject(data)
      }
    }).catch(function(error) {
      reject(error)
    })
  })
}