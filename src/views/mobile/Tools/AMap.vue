<template>
  <iframe src="https://m.amap.com/search/mapview/keywords=LANEHUB瓴里体验店" frameborder="0"></iframe>
</template>
<script>
  import wechat from '../../../mixins/wechat';
  import store_img_share from '../../../../static/mobile/img/h5/store_img_share.png';

  export default {
    title() {
      return `${this.query.name}`;
    },
    meta() {
      return `<meta name="description" content="地图">
              <meta name="keywords" content="地图">`;
    },
    mixins: [wechat],
    data() {
      return {
        query: this.$route.query
      };
    },
    mounted() {
      let that = this;
      // 微信分享
      const link = window.location.href;
      const title = `LANEHUB ${this.query.name}`;
      const desc = this.query.desc;
      const imgUrl = store_img_share;
      that.wxInit(link, title, desc, imgUrl);
    }
  };
</script>
<style lang="scss" scoped>
  iframe {
    width: 100%;
    height: 100%;
  }
</style>
<style lang="scss">
  html, body, #app {
    height: 100%;
  }
</style>



