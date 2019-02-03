<template>
  <div class="store-notice">
    <PublicTitle :pageTitle="'店铺公告'" v-if="!(response.__platform === 'app' || isTencent)"></PublicTitle>
    <div class="notice">
      <!-- <div class="notice-title">
        <h2>{{msg.title.h}}</h2>
        <p v-for="(val, i) in msg.title.p" :key="i">{{val}}</p>
      </div>
      <ul class="notice-content">
        <h3>{{msg.content.h}}</h3>
        <li v-for="(val, i) in msg.content.p" :key="i">{{val}}</li>
      </ul> -->
      <p v-for="(val, i) in msg.desc" :key="i">{{val}}</p>
      <br>
      <p>{{msg.notice}}</p>
    </div>
  </div>
</template>
<script>
  import hidetitle from '../../../../mixins/hidetitle.js';
  import {PublicTitle} from '../../../../components/mobile/business';

  export default {
    title() {
      return '店铺公告';
    },
    meta() {
      return `<meta name="description" content="店铺公告">
              <meta name="keywords" content="店铺公告">`;
    },
    components: {PublicTitle},
    mixins: [hidetitle],
    data() {
      return {
        msg: {
          desc: ['新春期间，店铺正常营业。', '除夕营业时间：10am - 17:30pm'],
          notice: '谢谢你关注瓴里线下体验店，来这里体验生活，创造愉悦。'
        }
      };
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .notice {
    padding: 0.4rem 0.3rem;
    background: #fff;
    .notice-title {
      margin-bottom: 0.4rem;
      h2 {
        margin-bottom: 0.3rem;
        font-size: 0.44rem;
        line-height: 100%;
        font-weight: 400;
        color: $themeColor;
      }
      p {
        font-size: 0.3rem;
        line-height: 100%;
        color: $themeColor;
      }
    }
    .notice-content {
      margin-bottom: 0.8rem;
      h3 {
        margin-bottom: 0.32rem;
        font-size: 0.32rem;
        line-height: 100%;
        font-weight: 400;
        color: $themeColor;
      }
      li {
        margin-bottom: 0.32rem;
        font-size: 0.3rem;
        line-height: 100%;
        color: $themeColor;
      }
    }
    p {
      font-size: 0.32rem;
      line-height: 150%;
      color: $themeColor;
    }
  }
</style>


