// js顺序执行
const loadScript = (container, url, callback) => {
  let script = document.createElement('script');
  if (script.readyState) {
    script.onreadystatechange = () => {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback && callback();
      }
    };
  } else {
    script.onload = () => {
      callback && callback();
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

// toast提示
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


if (!Date.now) Date.now = () => new Date().getTime();
const vendors = ['webkit', 'moz'];

// 设置定时器
const setTimer = (callback) => {
  for (let i = 0, LEN = vendors.length; i < LEN && !window.requestAnimationFrame; ++i) {
    const vp = vendors[i];
    window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
  }
  // iOS6 is buggy
  if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame) {
    let lastTime = 0;
    window.requestAnimationFrame = (callback) => {
      const now = Date.now();
      const nextTime = Math.max(lastTime + 16, now);
      return setTimeout(() => {
        callback(lastTime = nextTime);
      }, nextTime - now);
    };
  }

  return window.requestAnimationFrame(callback);
};

// 清除定时器
const clearTimer = (callback) => {
  for (let i = 0, LEN = vendors.length; i < LEN && !window.cancelAnimationFrame; ++i) {
    const vp = vendors[i];
    window.cancelAnimationFrame = (window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame']);
  }

  // iOS6 is buggy
  if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.cancelAnimationFrame) {
    window.cancelAnimationFrame = clearTimeout;
  }

  return window.cancelAnimationFrame(callback);
};

export {
  loadScript, pagetitle, warning, parseUrl, setTimer, clearTimer
};
