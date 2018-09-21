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
      return 'Lanehub - 首页';
    },
    meta() {
      return `<meta name="description" content="Lanehub 首页">
      <meta name="keywords" content="首页">`;
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
    background-color: #fff;
    .download_btn{
      margin: 0.8rem auto;
    }
  }
</style>

