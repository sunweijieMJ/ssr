import {os} from '../utils/business/judge';
import ToolApi from '../api/mobile/tools';

export default {
  data() {
    return {
      url: process.env.VUE_ENV === 'client' ? window.location.href.split('#')[0] : '', // ETC 当前url
      link: process.env.VUE_ENV === 'client' ? window.location.href : '', // ETC 链接地址
      title: 'LANEHUB 瓴里,创造愉悦生活方式的用户品牌', // ETC 页面标题
      desc: '通过匠心品质的家具家居产品,极致的线上线下体验,和懂生活、有品位、爱分享的朋友们,共同创造更美好的生活', // ETC 描述
      imgUrl: 'https://pic2.lanehub.cn/production/9aaa458c2fe23ef678bff7b2d2fb6e7e.jpg' // ETC 图片url
    };
  },
  methods: {
    // 初始化验证
    wxInit(link = this.link, title = this.title, desc = this.desc, imgUrl = this.imgUrl) {
      if (!(os().isWechat || os().isQQ)) return;
      const wx = require('weixin-js-sdk');
      let that = this;
      ToolApi().wxInit(encodeURIComponent(that.url)).then((res) => {
        if(res.status) {
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
    showMenuItems(wx) {
      if (!(os().isWechat || os().isQQ)) return;
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
    hideMenuItems(wx) {
      if (!(os().isWechat || os().isQQ)) return;
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
