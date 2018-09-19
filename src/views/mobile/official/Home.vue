<template>
  <div class="home">
    <laneHub-header></laneHub-header>
    <banner :banner="homeData.mobile.banner_msg"></banner>
    <image-text :imageText="homeData.mobile.image_text"></image-text>
    <downLoad-btn></downLoad-btn>
    <laneHub-footer></laneHub-footer>
  </div>
</template>
<script>
  import homeData from '../../../store/official/homeData.js';
  import {LaneHubHeader, Banner, ImageText, DownLoadBtn, LaneHubFooter} from '../../../components/mobile/official';

  export default {
    title() {
      return 'Lanehub 瓴里生活 JoyFull LifeStyle - 首页';
    },
    meta() {
      return `<meta name="description" content="LANEHUB 瓴里，创造愉悦生活方式的用户品牌。通过匠心品质的家具家居产品，极致的>    线上线下体验，和懂生活、有品位、爱分享的朋友们，共同创造更美好的生活。">
      <meta name="keywords" content="LANEHUB, 瓴里, 瓴里生活, LANEHUB Lifestyle, 家具, 家居, 新零售, 生活方式 - 首页">`;
    },
    asyncData({store}) {
      store.registerModule('homeData', homeData);
    },
    mounted() {
      this.$store.registerModule('homeData', homeData);
    },
    components: {
      LaneHubHeader, Banner, ImageText, DownLoadBtn, LaneHubFooter
    },
    computed: {
      homeData() {
        return this.$store.state.homeData;
      }
    },
    destroyed() {
      this.$store.unregisterModule('homeData', homeData);
    }
  };
</script>
<style lang="scss" scoped>
  .home{
    .download_btn{
      margin: 0.8rem auto;
    }
  }
</style>

