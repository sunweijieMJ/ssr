// 判断是否为pc端
const desktop = () =>  {
  const userAgentInfo = window.navigator.userAgent;
  const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod', 'okhttp/3.9.1'];
  let flag = true;
  for (let i = 0, LEN = Agents.length; i < LEN; i++) {
    if (userAgentInfo.indexOf(Agents[i]) !== -1) {
      flag = false;
      break;
    }
  }
  return flag;
};

const os = () => {
  const u = window.navigator.userAgent;

  return {
    // ETC 是否为移动终端
    isMobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/),
    isWechat: !!u.match(/MicroMessenger/i),
    isQQ: !!u.match(/MQQBrowserQQ/i),
    isIos: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ETC ios终端
    isAndroid: !!u.match(/(Android);?[\s/]+([\d.]+)?/),
    isiPhone: !!u.match(/(iPhone\sOS)\s([\d_]+)/),
    isSafari: !!u.match(/Safari/),
    isChrome: u.match(/Chrome/i) !== null && u.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i) === null ? true : false
  };
};

export {
  os, desktop
};
