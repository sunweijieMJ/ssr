<template>
  <div class="download-wrap">
    <h2 class="iconfont icon-footer_ic_logo"></h2>
    <p>一起开创新生活方式</p>
    <a :href="scheme" >打开瓴里 App</a>
    <div class="open">
      <span>没有App？&nbsp;</span>
      <a :href="os(global.userAgent).isiPhone ? 'https://itunes.apple.com/cn/app/id1319173852?mt=8' : 'https://download.lanehub.cn/android?channel=a2'">前往下载</a>
    </div>
    <img src="../../../../static/mobile/img/h5/h5_bg_linkapp.png" alt="">
  </div>
</template>
<script>
  import {os} from '../../../utils/business/judge.js';

  export default {
    title() {
      return '打开瓴里App';
    },
    meta() {
      return `<meta name="description" content="LANEHUB 瓴里，创造愉悦生活方式的用户品牌。通过匠心品质的家具家居产品，极致的>    线上线下体验，和懂生活、有品位、爱分享的朋友们，共同创造更美好的生活。">
              <meta name="keywords" content="LANEHUB, 瓴里, 瓴里生活, LANEHUB Lifestyle, 家具, 家居, 新零售, 生活方式 - APP 下载页">`;
    },
    data() {
      return {
        os,
        global,
        scheme: 'lanehub://'
      };
    },
    created() {
      let that = this;
      if(that.$route.query) {
        if(os(global.userAgent).isiPhone) {
          that.scheme = `lanehub://${that.$route.query.scheme}`;
        } else {
          that.scheme = `lanehub://myhome/${that.$route.query.scheme}`;
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .download-wrap {
    box-sizing: border-box;
    height: 100%;
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
      margin: 0.23rem 0 0.6rem;
    }
    >a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 3.6rem;
      height: 0.8rem;
      margin: 0 auto;
      border-radius: 0.4rem;
      background: $darkBlue;
      font-size: 0.32rem;
      font-weight: 400;
      color: #fff;
    }
    .open {
      display: flex;
      justify-content: center;
      margin: 0.3rem 0 0.7rem;
      span {
        font-size: 0.32rem;
        font-weight: 400;
        line-height: 1.4;
        color: #0072DD;
      }
      a {
        font-size: 0.32rem;
        font-weight: 400;
        line-height: 1.5;
        color: #0072DD;
        text-decoration: underline;
      }
    }
    img {
      width: 5.3rem;
      margin: 0 auto;
    }
  }
</style>
<style lang="scss">
  html, body, #app {
    height: 100%;
  }
</style>
