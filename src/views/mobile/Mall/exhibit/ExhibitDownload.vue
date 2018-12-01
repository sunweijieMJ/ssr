<template>
  <div class="download-wrap">
    <h3 class="iconfont icon-new_user_logo"></h3>
    <p>扫码自由购 商品送到家</p>
    <a href="javascript:;" @click="downApp">下载瓴里 App</a>
    <img :class="{notTencent: !isTencent}" src="../../../../../static/mobile/img/h5/store_bg_download.png" alt="">
  </div>
</template>
<script>
  import {os} from '../../../../utils/business/judge.js';
  import hidetitle from '../../../../mixins/hidetitle.js';

  export default {
    title() {
      return '下载App';
    },
    meta() {
      return `<meta name="description" content="LANEHUB 瓴里，创造愉悦生活方式的用户品牌。通过匠心品质的家具家居产品，极致的>    线上线下体验，和懂生活、有品位、爱分享的朋友们，共同创造更美好的生活。">
      <meta name="keywords" content="LANEHUB, 瓴里, 瓴里生活, LANEHUB Lifestyle, 家具, 家居, 新零售, 生活方式 - APP 下载页">`;
    },
    mixins: [hidetitle],
    methods: {
      downApp() {
        if(os().isWechat || os().isQQ){
          window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.weihe.myhome';
        } else if (os().isAndroid) {
          window.location.href = 'https://download.lanehub.cn/android?channel=a2';
        } else if(os().isiPhone) {
          window.location.href = 'https://itunes.apple.com/cn/app/id1319173852?mt=8';
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .download-wrap {
    box-sizing: border-box;
    position: relative;
    height: 100%;
    padding-top: 0.5rem;
    overflow: hidden;
    background-color: $darkBlue;
    h3 {
      font-size: 1.36rem;
      line-height: 1.36rem;
      text-align: center;
      color: #fff;
    }
    p {
      margin: 0.5rem 0 0.6rem;
      font-size: 0.44rem;
      line-height: 0.44rem;
      font-weight: 400;
      text-align: center;
      color: #fff;
    }
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 4.1rem;
      height: 0.88rem;
      margin: auto;
      border-radius: 0.82rem;
      background:#fff;
      font-size: 0.36rem;
      font-weight: 400;
      color: $darkBlue;
    }
    img {
      width: 4.7rem;
      margin: 0.52rem auto 0;
    }
  }

  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .download-wrap {
      h3 {
        padding-top: 0.8rem;
      }
      img {
        position: absolute;
        left: 0;right: 0;
        &.notTencent {
          bottom: -2rem;
        }
        bottom: -1rem;
      }
    }
  }
</style>
<style lang="scss">
  html, body, #app {
    height: 100%;
  }
</style>


