// js顺序执行
const loadScript = (container, url, callback) => {
  let script = document.createElement('script');
  if (script.readyState) {
    script.onreadystatechange = () => {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => {
      callback();
    };
  }
  script.src = url;
  container.appendChild(script);
};

// 兼容微信设置页面的title
const pagetitle = (title) => {
  const u = window.navigator.userAgent;
  if (/(\bMicroMessenger\/([\d.]+))|(QQ)/.test(u)) {
    let i = document.createElement('iframe');
    i.src = '/favicon.ico';
    i.style.display = 'none';
    i.onload = () => {
      setTimeout(() => {
        i.remove();
      }, 9);
    };
    document.title = title;
    document.body.appendChild(i);
  }
};

import {Toast} from 'mint-ui';
const warning = (message, duration, position, className, iconClass) => {
  Toast({message, duration, position, className, iconClass});
};

// 解析queryString
const parseUrl = () => {
  const url = window.location.search;
  if (url.indexOf('?') !== -1) {
    const str = url.substr(1);
    const strs = str.split('&');
    const response = {};
    for (let i = 0, LEN = strs.length; i < LEN; i++) {
      response[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
    }
    return response;
  } else {
    return {};
  }
};

export {
  loadScript, pagetitle, warning, parseUrl
};
