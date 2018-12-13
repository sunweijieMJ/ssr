<template>
  <iframe :src="`https://m.amap.com/share/index/lnglat=${query.lnglat}&name=${query.name}`" frameborder="0"></iframe>
</template>
<script>
  import wechat from '../../../mixins/wechat';

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
      if(!that.product_info.basic) return;
      const link = window.location.href;
      const title = this.query.name;
      const desc = this.query.name;
      const imgUrl = '';
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



