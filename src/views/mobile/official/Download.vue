<template>
  <div class="download-wrap">
    <h2>瓴里</h2>
    <p>一起打造愉悦生活方式</p>
    <div class="img-box">
      <img src="../../../../static/mobile/img/download_ic_app.png" alt="">
    </div>
    <div class="download-btn lh-footer">
      <a href="javascript:;" @click="downApp">下载瓴里 App</a>
    </div>
  </div>
</template>
<script>
  import {os} from '../../../utils/business/judge.js';

  export default {
    title() {
      return '下载页';
    },
    meta() {
      return `<meta name="description" content="下载页">
      <meta name="keywords" content="下载页">`;
    },
    beforeMount(){
      this.downApp();
    },
    methods: {
      downApp() {
        if(os().isisWechat || os().isQQ){
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
    width: 100%;
    position: fixed;
    top: 0;
    height: 100%;
    background: linear-gradient(rgb(230, 230, 230), rgb(191, 191, 191));
    h2 {
      font-size: 0.6rem;
      font-weight: 300;
      text-align: center;
      color: $themeColor;
      padding-top: 0.75rem;
    }
    @media only screen and (width: 375px) and (height: 812px) {
      h2 {
        padding-top: 20% !important;
      }
    }
    @media only screen and (width: 375px) and (height: 690px) {
      h2 {
        padding-top: 20% !important;
      }
    }
    p {
      font-size: 0.3rem;
      text-align: center;
      color: #363636;
      margin: 0.14rem 0 0.45rem;
    }
    .img-box {
      //没道理啊   iphoneX居然没有相应
      @media only screen and (device-width: 375px) and (device-height:812px) and (-webkit-device-pixel-ratio:3) {
        img {
          width: 5.33rem!important;
          margin: 0 auto;
        }
      }
      img {
        width: 4.33rem;
        margin: 0 auto;
      }
    }
    .download-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 2.8rem;
      position: fixed;
      bottom: 0;
      background-color: #ffffff;
      a {
        width: 3.22rem;
        height: 0.88rem;
        border-radius: 2rem;
        background-color: $darkBlue;
        font-size: 0.32rem;
        font-family: Helvetica;
        line-height: 0.88rem;
        text-align: center;
        color: #ffffff;
      }
    }
  }
</style>


