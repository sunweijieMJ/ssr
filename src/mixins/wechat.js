import wx from 'weixin-js-sdk';
import {os} from '../utils/business/judge';

export default {
  data() {
    return {
      initEnabled: true,
      url: window.location.href.split('#')[0], // ETC 当前url
      link: window.location.href, // ETC 链接地址
      title: 'LANEHUB 瓴里,创造愉悦生活方式的用户品牌', // ETC 页面标题
      desc: '通过匠心品质的家具家居产品,极致的线上线下体验,和懂生活、有品位、爱分享的朋友们,共同创造更美好的生活', // ETC 描述
      imgUrl: 'https://pic.lanehub.cn/production/f79c754af5cf4eea5312d5c596b54c9d.jpg?x-oss-process=style/m-00001' // ETC 图片url
    };
  },
  created() {
    let that = this;
    that.judgeRoute();
    if (that.initEnabled) that.wxInit();
  },
  methods: {
    // 初始化验证
    wxInit(link = this.link, title = this.title, desc = this.desc, imgUrl = this.imgUrl) {
      if (!os().isWechat) return;
      let that = this;
      that.$api.get('/wechat/pub/get_jsapiticket', {'url': encodeURIComponent(that.url)}, res => {
        if (res.code === '00006') {
          let json = res.data;
          if (!json.appId) return;
          // 微信初始化
          wx && wx.config({
            debug: false, // ETC 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: json.appId, // ETC 必填，公众号的唯一标识
            timestamp: json.timestamp, // ETC 必填，生成签名的时间戳
            nonceStr: json.nonceStr, // ETC 必填，生成签名的随机串
            signature: json.signature, // ETC 必填，签名，见附录1
            jsApiList: [
              'onMenuShareAppMessage',
              'onMenuShareTimeline',
              'onMenuShareQQ',
              'onMenuShareWeibo',
              'onMenuShareQZone',
              'showMenuItems',
              'hideMenuItems'
            ] // ETC 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx && wx.error(() => {
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          });
          // ready函数触发
          wx && wx.ready(() => {
            // 分享到朋友
            wx.onMenuShareAppMessage({
              title, // ETC 分享标题
              desc, // ETC 分享描述
              link, // ETC 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl, // ETC 分享图标
              type: 'link', // ETC 分享类型,music、video或link，不填默认为link
              dataUrl: '', // ETC 如果type是music或video，则要提供数据链接，默认为空
              success: () => {
                // 用户确认分享后执行的回调函数
              },
              cancel: () => {
                // 用户取消分享后执行的回调函数
              }
            });
            // 分享到朋友圈
            wx.onMenuShareTimeline({
              title, // ETC 分享标题
              desc, // ETC 分享描述
              link, // ETC 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl, // ETC 分享图标
              success: () => {
                // 用户确认分享后执行的回调函数
              },
              cancel: () => {
                // 用户取消分享后执行的回调函数
              }
            });
            // 分享到QQ
            wx.onMenuShareQQ({
              title, // ETC 分享标题
              desc, // ETC 分享描述
              link, // ETC 分享链接
              imgUrl, // ETC 分享图标
              success: () => {
                // 用户确认分享后执行的回调函数
              },
              cancel: () => {
                // 用户取消分享后执行的回调函数
              }
            });
            // 分享到QQ空间
            wx.onMenuShareQZone({
              title, // ETC 分享标题
              desc, // ETC 分享描述
              link, // ETC 分享链接
              imgUrl, // ETC 分享图标
              success: () => {
                // 用户确认分享后执行的回调函数
              },
              cancel: () => {
                // 用户取消分享后执行的回调函数
              }
            });
            // 分享到微博
            wx.onMenuShareWeibo({
              title, // ETC 分享标题
              desc, // ETC 分享描述
              link, // ETC 分享链接
              imgUrl, // ETC 分享图标
              success: () => {
                // 用户确认分享后执行的回调函数
              },
              cancel: () => {
                // 用户取消分享后执行的回调函数
              }
            });
          });
        }
      });
    },
    // 判断当前路由
    judgeRoute() {
      let that = this;
      const route = ['ActivityDetail', 'DynamicDetail', 'TopicDetail', 'ArticleDetail', 'Personal', 'ProductDetail', 'BuyerShow'];
      for (let i = 0, LEN = route.length; i < LEN; i++) {
        if (that.$route.name === route[i]) {
          that.initEnabled = false;
          break;
        }
      }
    },
    showMenuItems() {
      if (!os().isWechat) return;
      wx.showMenuItems({
        menuList: [
          'menuItem:share:appMessage',
          'menuItem:share:timeline',
          'menuItem:share:qq',
          'menuItem:share:weiboApp',
          'menuItem:share:QZone'
        ]
      });
    },
    hideMenuItems() {
      if (!os().isWechat) return;
      // 要隐藏的菜单项,只能隐藏“传播类”和“保护类”按钮
      wx.hideMenuItems({
        menuList: [
          'menuItem:share:appMessage',
          'menuItem:share:timeline',
          'menuItem:share:qq',
          'menuItem:share:weiboApp',
          'menuItem:share:QZone'
        ]
      });
    }
  }
};
