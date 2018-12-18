<template>
  <div class="download-wrap" v-if="!popup">
    <h3>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-new_user_logo"></use>
      </svg>
    </h3>
    <p>扫码自由购 商品送到家</p>
    <a href="javascript:;" @click="downApp">下载瓴里 App</a>
    <img src="../../../../../static/mobile/img/h5/store_bg_download.png" alt="">
  </div>
  <app-link v-else></app-link>
</template>
<script>
  import linsign from '../../../../utils/signFun';
  import {os} from '../../../../utils/business/judge.js';
  import AppLink from '../../../../views/mobile/Tools/AppLink.vue';

  export default {
    title() {
      return '下载App';
    },
    meta() {
      return `<meta name="description" content="LANEHUB 瓴里，创造愉悦生活方式的用户品牌。通过匠心品质的家具家居产品，极致的>    线上线下体验，和懂生活、有品位、爱分享的朋友们，共同创造更美好的生活。">
      <meta name="keywords" content="LANEHUB, 瓴里, 瓴里生活, LANEHUB Lifestyle, 家具, 家居, 新零售, 生活方式 - APP 下载页">`;
    },
    components: {
      AppLink
    },
    data() {
      return {
        popup: false
      };
    },
    mounted() {
      if((os().isWechat || os().isQQ) || !os().isAndroid) return;
      window.location.href = `lanehub://myhome/exhibit_list?${linsign.urlConcat(this.$route.query)}`;
    },
    methods: {
      schemeUrl(url){
        const ifr = document.createElement('iframe');
        ifr.src = url;
        ifr.style.width = '0px';
        ifr.style.height = '0px';
        document.body.appendChild(ifr);
      },
      downApp() {
        if(os().isiPhone) {
          window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.weihe.myhome';
        } else if((os().isWechat) && os().isAndroid) {
          this.popup = true;
        } else if(os().isAndroid) {
          window.location.href = 'https://download.lanehub.cn/android?channel=a2';
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
      text-align: center;
      svg {
        width: 1.36rem;
        height: 1.36rem;
      }
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
      display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
      display: -moz-box; /* Firefox 17- */
      display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
      display: -moz-flex; /* Firefox 18+ */
      display: -ms-flexbox; /* IE 10 */
      display: flex; /* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */
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
      width: 5rem;
      margin: 0.52rem auto 0;
    }
  }

  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .download-wrap {
      h3 {
        padding-top: 0.8rem;
      }
      img {
        width: 5rem;
        margin: 1.1rem auto 0;
      }
    }
  }
</style>
<style lang="scss">
  html, body, #app {
    height: 100%;
  }
</style>


