class AppBridgeSDK {

  constructor() {
    this.osType = this.getOsType();
  }
  /**
   * 给APP webview 传递当前网页高度
   * @param {int} height
   */
  passPageHeight(height) {
    if(window && window.sizeManage && window.sizeManage.putFinalHeight) {
      window.sizeManage.putFinalHeight(height);
    }
  }

  getOsType() {
    let u = navigator.userAgent;
    return { // ETC 移动终端浏览器版本信息
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ETC ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // ETC android终端或uc浏览器
      iPhone: u.indexOf('iPhone') > -1, // ETC 是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, // ETC 是否iPad
      isWx: u.indexOf('MicroMessenger') > -1 // ETC 是微信游览器
    };
  }

  /**
   * 调起 IOS APP Bridge
   * @param function callback
   */
  setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
      return callback(window.WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    let WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(() => {
      document.documentElement.removeChild(WVJBIframe);
    }, 0);
  }
}

let instance;
export default function createRequest() {
  if (instance) {
    return instance;
  }
  instance = new AppBridgeSDK();
  return instance;
}
