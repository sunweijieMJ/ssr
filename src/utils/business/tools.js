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
  if (this.toastObj) this.toastObj.close();
  this.toastObj = Toast({message, duration, position, className, iconClass});
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

// 防抖
const debounce = (func, delay, immediate) => {
  let timer = null;
  return () => {
    let [that, args] = [this, arguments];
    if (timer) clearTimeout(timer);
    if (immediate) {
      // 根据距离上次触发操作的时间是否到达delay来决定是否要现在执行函数
      const doNow = !timer;
      // 每一次都重新设置timer，就是要保证每一次执行的至少delay秒后才可以执行
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      // 立即执行
      if (doNow) func.apply(that, args);
    } else {
      timer = setTimeout(() => {
        func.apply(that, args);
      }, delay);
    }
  };
};

// 节流
const throttle = (func, delay) => {
  let [timer, startTime] = [null, Date.now()];

  return () => {
    let [that, args, curTime] = [this, arguments, Date.now()];
    const remaining = delay - (curTime - startTime);

    clearTimeout(timer);
    if (remaining <= 0) {
      func.apply(that, args);
      startTime = Date.now();
    } else {
      timer = setTimeout(func, remaining);
    }
  };
};

const uuid = (len, radix) => {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  let uuid = [], i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    // rfc4122, version 4 form
    let r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    /*
     * Fill in random data.  At i==19 set the high bits of clock sequence as
     * per rfc4122, sec. 4.1.5
     */
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('').toLowerCase();
};

export {
  loadScript, pagetitle, warning, parseUrl, setTimer, clearTimer, debounce, throttle, uuid
};
