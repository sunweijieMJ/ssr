const os = (u = window.navigator.userAgent) => {

  return {
    // 不同浏览器及终端
    isMobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/),
    isWechat: !!u.match(/MicroMessenger/i),
    isQQ: !!u.match(/QQ/i),
    isIos: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    isAndroid: !!u.match(/(Android);?[\s/]+([\d.]+)?/),
    isiPhone: !!u.match(/(iPhone\sOS)\s([\d_]+)/),
    isSafari: !!u.match(/Safari/),
    isChrome: u.match(/Chrome/i) !== null && u.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i) === null ? true : false,
    isDeskTop: (() => {
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

import linsign from '../signFun';
const appRoute = (route, id, data) => {
  const u = window.navigator.userAgent;

  // universal link跳转
  if (u.indexOf('iPhone') > -1) {
    switch (route) {
      // 精选
      case 'Choiceness':
        return 'https://oia.lanehub.cn/homepage/1';
        break;
      // 热门
      case 'Discovery':
        return 'https://oia.lanehub.cn/homepage/4';
        break;
      // 动态
      case 'Moment':
        return 'https://oia.lanehub.cn/status/list';
        break;
      // 个人主页
      case 'Profile':
        return `https://oia.lanehub.cn/profile/${id}`;
        break;
      // 文章详情
      case 'ArticleDetail':
        return `https://oia.lanehub.cn/article_detail/${id}`;
        break;
      // 活动详情
      case 'ActivityDetail':
        return `https://oia.lanehub.cn/activity_detail/${id}`;
        break;
      // 话题详情
      case 'TopicDetail':
        return `https://oia.lanehub.cn/topic_detail/${id}`;
        break;
      // 动态详情
      case 'MomentDetail':
        return `https://oia.lanehub.cn/moment_detail/${id}`;
        break;
      // 商品详情
      case 'ProductDetail':
        return `https://oia.lanehub.cn/product_detail/${id}`;
        break;
      // 买家秀
      case 'BuyerShow':
        return `https://oia.lanehub.cn/buyershow/${id}`;
        break;
      // 新用户礼包
      case 'NewUserGift':
        return 'https://oia.lanehub.cn/new_user_gift';
      // 全部文章
      case 'ArticleList':
        return 'https://oia.lanehub.cn/article_list';
        break;
      // 全部活动
      case 'ActivityList':
        return 'https://oia.lanehub.cn/activity_list';
        break;
      // 店铺首页
      case 'StoreDetail':
        return `https://oia.lanehub.cn/store_page?${linsign.urlConcat(data)}`;
        break;
      // 咖啡列表
      case 'FoodList':
        return `https://oia.lanehub.cn/food_list?${linsign.urlConcat(data)}`;
        break;
      // 食品秀
      case 'FoodShow':
        return `https://oia.lanehub.cn/food_show?${linsign.urlConcat(data)}`;
        break;
      // 人工榜单详情
      case 'ArtificialProduct':
        return `https://oia.lanehub.cn/manualList_detail?${linsign.urlConcat(data)}`;
        break;
      // 自动榜单详情
      case 'AutoNewProduct':
        return `https://oia.lanehub.cn/automaticList_detail?${linsign.urlConcat(data)}`;
        break;
      // 新商城列表
      case 'Mall':
        return 'https://oia.lanehub.cn/mall_index';
        break;
      // 类目列表
      case 'ShopList':
        return `https://oia.lanehub.cn/mall_category_page?${linsign.urlConcat(data)}`;
        break;
      // 全部类目
      case 'ShopCategory':
        return 'https://oia.lanehub.cn/mall_category_list';
        break;
      default:
        return 'https://oia.lanehub.cn/';
        break;
    }
  // android scheme跳转
  } else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    switch (route) {
      // 精选
      case 'Choiceness':
        return 'lanehub://myhome/homepage?id=1';
        break;
      // 热门
      case 'Discovery':
        return 'lanehub://myhome/homepage?id=2';
        break;
      // 动态
      case 'Moment':
        return 'lanehub://myhome/homepage?id=4';
        break;
      // 个人主页
      case 'Profile':
        return `lanehub://myhome/profile?id=${id}`;
        break;
      // 文章详情
      case 'ArticleDetail':
        return `lanehub://myhome/article_detail?id=${id}`;
        break;
      // 活动详情
      case 'ActivityDetail':
        return `lanehub://myhome/activity_detail?id=${id}`;
        break;
      // 话题详情
      case 'TopicDetail':
        return `lanehub://myhome/topic_detail?id=${id}`;
        break;
      // 动态详情
      case 'MomentDetail':
        return `lanehub://myhome/moment_detail?id=${id}`;
        break;
      // 商品详情
      case 'ProductDetail':
        return `lanehub://myhome/product_detail?id=${id}`;
        break;
      // 买家秀
      case 'BuyerShow':
        return `lanehub://myhome/buyershow?id=${id}`;
        break;
      // 新用户礼包
      case 'NewUserGift':
        return 'lanehub://myhome/new_user_gift';
        break;
      // 全部活动
      case 'ActivityList':
        return 'lanehub://myhome/activity_list';
        break;
      // 全部文章
      case 'ArticleList':
        return 'lanehub://myhome/article_list';
        break;
      // 店铺首页
      case 'StoreDetail':
        return `lanehub://myhome/store_page?${linsign.urlConcat(data)}`;
        break;
      // 咖啡列表
      case 'FoodList':
        return `lanehub://myhome/food_list?${linsign.urlConcat(data)}`;
        break;
      // 食品秀
      case 'FoodShow':
        return `lanehub://myhome/food_show?${linsign.urlConcat(data)}`;
        break;
      // 人工榜单详情
      case 'ArtificialProduct':
        return `lanehub://myhome/manualList_detail?${linsign.urlConcat(data)}`;
        break;
      // 自动榜单详情
      case 'AutoNewProduct':
        return `lanehub://myhome/automaticList_detail?${linsign.urlConcat(data)}`;
        break;
      // 新商城列表
      case 'Mall':
        return 'lanehub://myhome/shop_list';
        break;
      // 类目列表
      case 'ShopList':
        return `lanehub://myhome/mall_category_list?${linsign.urlConcat(data)}`;
        break;
      // 全部类目
      case 'ShopCategory':
        return 'lanehub://myhome/mall_all_category';
        break;
      // 陈列列表
      case 'ExhibitList':
        return `lanehub://myhome/exhibit_list?${linsign.urlConcat(data)}`;
        break;
      default:
        return 'lanehub://';
        break;
    }
  // ios scheme跳转
  } else if (u.indexOf('iPhone') > -1) {
    switch (route) {
      // 精选
      case 'Choiceness':
        return 'lanehub://homepage/1';
        break;
      // 热门
      case 'Discovery':
        return 'lanehub://homepage/4';
        break;
      // 动态
      case 'Moment':
        return 'lanehub://status/list';
        break;
      // 个人主页
      case 'Profile':
        return `lanehub://profile/${id}`;
        break;
      // 文章详情
      case 'ArticleDetail':
        return `lanehub://article_detail/${id}`;
        break;
      // 活动详情
      case 'ActivityDetail':
        return `lanehub://activity_detail/${id}`;
        break;
      // 话题详情
      case 'TopicDetail':
        return `lanehub://topic_detail/${id}`;
        break;
      // 动态详情
      case 'MomentDetail':
        return `lanehub://moment_detail/${id}`;
        break;
      // 商品详情
      case 'ProductDetail':
        return `lanehub://product_detail/${id}`;
        break;
      // 买家秀
      case 'BuyerShow':
        return `lanehub://buyershow/${id}`;
        break;
      // 新用户礼包
      case 'NewUserGift':
        return 'lanehub://new_user_gift';
        break;
      // 全部活动
      case 'ActivityList':
        return 'lanehub://activity_list';
        break;
      // 全部文章
      case 'ArticleList':
        return 'lanehub://article_list';
        break;
      // 店铺首页
      case 'StoreDetail':
        return `lanehub://store_page?${linsign.urlConcat(data)}`;
        break;
      // 咖啡列表
      case 'FoodList':
        return `lanehub://food_list?${linsign.urlConcat(data)}`;
        break;
      // 食品秀
      case 'FoodShow':
        return `lanehub://food_show?${linsign.urlConcat(data)}`;
        break;
      // 人工榜单详情
      case 'ArtificialProduct':
        return `lanehub://manualList_detail?${linsign.urlConcat(data)}`;
        break;
      // 自动榜单详情
      case 'AutoNewProduct':
        return `lanehub://automaticList_detail?${linsign.urlConcat(data)}`;
        break;
      // 新商城列表
      case 'Mall':
        return 'lanehub://mall_index';
        break;
      // 类目列表
      case 'ShopList':
        return `lanehub://mall_category_page?${linsign.urlConcat(data)}`;
        break;
      // 全部类目
      case 'ShopCategory':
        return 'lanehub://mall_category_list';
        break;
      default:
        return 'lanehub://';
        break;
    }
  }
};

export {
  os, appRoute
};
