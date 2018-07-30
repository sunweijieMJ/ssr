import axios from 'axios';
import createRequest from '../utils/request';

const request = new createRequest();
const Axios = axios.create({
  timeout: 10000,
  responseType: 'json',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
});

export default function fetch(options) {
  options.baseURL = global.config.getServerApiHost();
  options.headers = {
      Cookie: `siteType=${request.getSiteType()};osType=${request.getOsType()}`
  }
  console.log('request params:', JSON.stringify(options))
  let start = new Date().getTime();
  return new Promise(function(resolve, reject) {
    Axios(options).then(function(res) {
      let {status, data} = res;
      let end = new Date().getTime();
      console.log('apisuccess', '|status:', JSON.stringify(status), '|request time:', end - start, 'ms |request:', JSON.stringify(options), '|data:', JSON.stringify(data), '\n')
      if (status === 200) {
        resolve(data)
      } else {
        console.log(res.data.message);
        reject(data)
      }
    }).catch(function(error) {
      console.log('apierror', '|request:', JSON.stringify(option), '|error:', JSON.stringify(error), '\n')
      reject(error)
    })
  })
}