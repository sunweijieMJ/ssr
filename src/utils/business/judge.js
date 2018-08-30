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
    isChrome: u.match(/Chrome/i) !== null && u.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i) === null ? true : false,
    isDeskTop: (() => {
      const u = window.navigator.userAgent;
      const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod', 'okhttp/3.9.1'];
      let flag = true;
      for (let i = 0, LEN = Agents.length; i < LEN; i++) {
        if (u.indexOf(Agents[i]) !== -1) {
          flag = false;
          break;
        }
      }
      return flag;
    })()
  };
};

// 当前页对应app页面
const appRoute = (route, id) => {
  const u = window.navigator.userAgent;
  // 判断浏览器
  if (u.indexOf('iPhone') > -1) {
    switch (route) {
      // 精选
      case 'Choiceness':
        this.current_url = 'https://oia.lanehub.cn/homepage/1';
        break;
      // 动态
      case 'Moment':
        this.current_url = 'https://oia.lanehub.cn/status/list';
        break;
      // 个人主页
      case 'Profile':
        this.current_url = `https://oia.lanehub.cn/profile/${id}`;
        break;
      // 文章详情
      case 'ArticleDetail':
        this.current_url = `https://oia.lanehub.cn/article_detail/${id}`;
        break;
      // 活动详情
      case 'ActivityDetail':
        this.current_url = `https://oia.lanehub.cn/activity_detail/${id}`;
        break;
      // 话题详情
      case 'TopicDetail':
        this.current_url = `https://oia.lanehub.cn/topic_detail/${id}`;
        break;
      // 动态详情
      case 'MomentDetail':
        this.current_url = `https://oia.lanehub.cn/moment_detail/${id}`;
        break;
      // 商品详情
      case 'ProductDetail':
        this.current_url = `https://oia.lanehub.cn/product_detail/${id}`;
        break;
      // 买家秀
      case 'BuyerShow':
        this.current_url = `https://oia.lanehub.cn/buyershow/${id}`;
        break;
      default:
        this.current_url = 'https://oia.lanehub.cn/';
        break;
    }
  } else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    switch (route) {
      // 精选
      case 'Choiceness':
        this.current_url = 'lanehub://myhome/homepage?id=1';
        break;
      // 动态
      case 'Moment':
        this.current_url = 'lanehub://myhome/homepage?id=4';
        break;
      // 个人主页
      case 'Profile':
        this.current_url = `lanehub://myhome/profile?id=${id}`;
        break;
      // 文章详情
      case 'ArticleDetail':
        this.current_url = `lanehub://myhome/article_detail?id=${id}`;
        break;
      // 活动详情
      case 'ActivityDetail':
        this.current_url = `lanehub://myhome/activity_detail?id=${id}`;
        break;
      // 话题详情
      case 'TopicDetail':
        this.current_url = `lanehub://myhome/topic_detail?id=${id}`;
        break;
      // 动态详情
      case 'MomentDetail':
        this.current_url = `lanehub://myhome/moment_detail?id=${id}`;
        break;
      // 商品详情
      case 'ProductDetail':
        this.current_url = `lanehub://myhome/product_detail?id=${id}`;
        break;
      // 买家秀
      case 'BuyerShow':
        this.current_url = `lanehub://myhome/buyershow?id=${id}`;
        break;
      default:
        this.current_url = 'lanehub://';
        break;
    }
  } else if (u.indexOf('iPhone') > -1) {
    // scheme跳转
    switch (route) {
      // 精选
      case 'Choiceness':
        this.current_url = 'lanehub://homepage/1';
        break;
      // 动态
      case 'Moment':
        this.current_url = 'lanehub://status/list';
        break;
      // 个人主页
      case 'Profile':
        this.current_url = `lanehub://profile/${id}`;
        break;
      // 文章详情
      case 'ArticleDetail':
        this.current_url = `lanehub://article_detail/${id}`;
        break;
      // 活动详情
      case 'ActivityDetail':
        this.current_url = `lanehub://activity_detail/${id}`;
        break;
      // 话题详情
      case 'TopicDetail':
        this.current_url = `lanehub://topic_detail/${id}`;
        break;
      // 动态详情
      case 'MomentDetail':
        this.current_url = `lanehub://moment_detail/${id}`;
        break;
      // 商品详情
      case 'ProductDetail':
        this.current_url = `lanehub://product_detail/${id}`;
        break;
      // 买家秀
      case 'BuyerShow':
        this.current_url = `lanehub://buyershow/${id}`;
        break;
      default:
        this.current_url = 'lanehub://';
        break;
    }
  }
};

export {
  os, appRoute
};
