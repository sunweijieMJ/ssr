let config = {
  concat: true,
  delay: 0, // ETC 错误处理间隔时间
  maxError: 16, // ETC 异常报错数量限制
  sampling: 1, // ETC 采样率
  errorSite: '', // ETC 不同平台
  devLogURL: 'http://jserror.release.weiheinc.com/ts.html?', // ETC 测试错误日志
  logURL: 'https://m.lanehub.cn/ts.html?', // ETC 线上错误日志
  isDev: /dev|test|release|localhost|127.0.0.1/.test(document.domain)
};

let Monitor = {};
// 错误类型状态码
let ERROR_CONSOLE = 1,
  ERROR_RUNTIME = 2,
  ERROR_SCRIPT = 3,
  ERROR_STYLE = 4,
  ERROR_IMAGE = 5,
  ERROR_AUDIO = 6,
  ERROR_VIDEO = 7;

// 错误类型
let LOAD_ERROR_TYPE = {
  SCRIPT: ERROR_SCRIPT,
  LINK: ERROR_STYLE,
  IMG: ERROR_IMAGE,
  AUDIO: ERROR_AUDIO,
  VIDEO: ERROR_VIDEO
};

// 忽略错误监听
window.ignoreError = false;
// 错误日志列表
let errorList = [];
// 错误处理回调
let report = function() { };

/**
 * debounce 防抖函数
 *
 * @param {Function} func 实际要执行的函数
 * @param {Number} delay 延迟时间,单位: ms
 * @param {Function} callback 在 func 执行后的回调
 *
 * @return {Function}
 */
function debounce(func, delay, callback) {
  let timer;

  return () => {
    let that = this;
    let args = arguments;

    clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(that, args);
      !callback || callback();
    }, delay);
  };
}

/**
 * 设置一个采样率,决定是否上报
 *
 * @param  {Number} sampling 概率值(0 - 1)
 * @return {Boolean}
 */
function needReport(sampling) {
  return Math.random() < (sampling || 1);
}

/**
 * 往异常信息数组里面添加一条记录
 *
 * @param  {Object} errorLog 错误日志
 */
function pushError(errorLog) {
  if (needReport(config.sampling) && errorList.length < config.maxError) {
    errorList.push(errorLog);
  }
}

/**
 * 生成 runtime 错误日志
 *
 * @param  {String} message 错误信息
 * @param  {String} source  发生错误的脚本 URL
 * @param  {Number} lineno  发生错误的行号
 * @param  {Number} colno   发生错误的列号
 * @param  {Object} error   error 对象
 * @return {Object}
 */
function formatRuntimerError(message, source, lineno, colno, error) {
  return {
    type: ERROR_RUNTIME,
    desc: message + ' at ' + source + ':' + lineno + ':' + colno,
    stack: error && error.stack ? error.stack.substring(0, 300) : 'no stack' // ETC IE <9, has no error stack
  };
}

/**
 * 生成 laod 错误日志
 *
 * @param  {Object} errorTarget
 * @return {Object}
 */
function formatLoadError(errorTarget) {
  return {
    type: LOAD_ERROR_TYPE[errorTarget.nodeName.toUpperCase()],
    desc: errorTarget.baseURI + '@' + (errorTarget.src || errorTarget.href),
    stack: 'no stack'
  };
}


/**
 * 发送错误日志
 *
 * @param {Object} params
 */
function logReport(params) {
  let errorinfo = 'tp=jserror&site=' + config.errorSite + '&msg=',
    key,
    url,
    arr = [],
    domScript,
    msg;
  if (typeof params === 'string') {
    msg = params;
  }
  if (typeof params === 'object') {
    for (key in params) {
      if (params.hasOwnProperty(key)) {
        let Nvalue = params[key].stack ? params[key].stack.substring(0, 300) : params[key];
        arr.push(key + ':' + encodeURIComponent(JSON.stringify(Nvalue)));
      }
    }
    msg = arr.join(',');
  }
  domScript = document.createElement('script');
  if (config.isDev) {
    url = config.devLogURL + errorinfo + msg;
  } else {
    url = config.logURL + errorinfo + msg;
  }
  domScript.src = url;
  domScript.onload = () => {
    domScript && domScript.remove && domScript.remove();
    domScript && domScript.removeNode && domScript.removeNode();
  };
  let head = document.head || document.documentElement;
  head.appendChild(domScript);
  return true;
}

/**
 * 错误数据预处理
 *
 * @param  {Object} errorLog    错误日志
 */
function handleError(errorLog) {
  // 是否延时处理
  if (!config.delay) {
    !needReport(config.sampling) || logReport([errorLog]);
  } else {
    pushError(errorLog);
    report(errorList);
  }
}

/**
 * merge
 *
 * @param  {Object} src
 * @param  {Object} dest
 * @return {Object}
 */
function merge(src, dest) {
  for (let item in src) {
    dest[item] = src[item];
  }

  return dest;
}
function __config(opts) {
  merge(opts, config);

  report = debounce(logReport, config.delay, () => {
    errorList = [];
  });
}

function __init() {
  // 监听 Javascript 报错
  window.onerror = () => {
    if (window.ignoreError) {
      window.ignoreError = false;
      return;
    }
    handleError(formatRuntimerError.apply(null, arguments));
  };

  // 针对vue的console.error 劫持
  console.error = ((origin) => {
    return (info) => {
      let errorLog = {
        type: ERROR_CONSOLE,
        desc: info.stack
      };
      handleError(errorLog);
      origin.call(console, info);
    };
  })(console.error);

  // 监听资源加载错误(JavaScript Scource failed to load)
  window.addEventListener('error', (event) => {
    // 过滤 target 为 window 的异常，避免与上面的 onerror 重复
    let errorTarget = event.target;
    if (errorTarget !== window && errorTarget.nodeName && LOAD_ERROR_TYPE[errorTarget.nodeName.toUpperCase()]) {
      handleError(formatLoadError(errorTarget));
    }
  }, true);
}

Monitor.init = (opts) => {
  __config(opts, config);
  __init();
};

Monitor.handleError = handleError;

export default Monitor;
