<template>
  <div class="download-wrap">
    <h2 class="iconfont icon-footer_ic_logo"></h2>
    <p>一起开创新生活方式</p>
    <a href="javascript:;" @click="downApp">下载瓴里 App</a>
    <img src="../../../../static/mobile/img/h5/h5_bg_download.png" alt="">
  </div>
</template>
<script>
  import {os} from '../../../utils/business/judge.js';

  export default {
    title() {
      return '下载App';
    },
    meta() {
      return `<meta name="description" content="LANEHUB 瓴里，创造愉悦生活方式的用户品牌。通过匠心品质的家具家居产品，极致的>    线上线下体验，和懂生活、有品位、爱分享的朋友们，共同创造更美好的生活。">
              <meta name="keywords" content="LANEHUB, 瓴里, 瓴里生活, LANEHUB Lifestyle, 家具, 家居, 新零售, 生活方式 - APP 下载页">`;
    },
    beforeMount(){
      this.downApp();
    },
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
  @import '../../../assets/scss/_base.scss';

  .download-wrap {
    box-sizing: border-box;
    height: 100vh;
    padding-top: 1.15rem;
    overflow: hidden;
    background: linear-gradient(180deg,rgba(250,250,250,1) 0%,rgba(250,250,250,1) 100%);
    h2 {
      font-size: 0.58rem;
      font-weight: 500;
      line-height: 0.64rem;
      text-align: center;
      color: $themeColor;
    }
    p {
      font-size: 0.34rem;
      font-weight: 400;
      line-height: 0.34rem;
      text-align: center;
      letter-spacing: 0.13rem;
      color: $themeColor;
      margin: 0.23rem 0 0.64rem;
    }
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 3.6rem;
      height: 0.8rem;
      margin: 0 auto 0.77rem;
      border-radius: 0.4rem;
      background: $darkBlue;
      font-size: 0.32rem;
      font-weight: 400;
      color: #fff;
    }
    img {
      width: 5.3rem;
      margin: 0 auto;
    }
  }

  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .download-wrap h2{
      padding-top: 1.8rem;
    }
  }

  @include pc(960px);
</style>


