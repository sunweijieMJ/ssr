<template>
  <div class="about_us">
    <template v-if="$route.path === '/Description/about_us'">
      <life-style></life-style>
    </template>
    <template v-else>
      <laneHub-header></laneHub-header>
    </template>
    <banner :banner="aboutData.mobile.banner_msg"></banner>
    <image-text :imageText="aboutData.mobile.image_text"></image-text>
    <downLoad></downLoad>
    <laneHub-footer></laneHub-footer>
  </div>
</template>
<script>
  import aboutData from '../../../store/official/aboutData.js';
  import {LifeStyle} from '../../../components/mobile/business';
  import {LaneHubHeader, Banner, ImageText, DownLoad, LaneHubFooter} from '../../../components/mobile/official';

  export default {
    title() {
      return 'Lanehub 瓴里生活 JoyFull LifeStyle - 关于我们';
    },
    meta() {
      return `<meta name="description" content="LANEHUB 瓴里，创造愉悦生活方式的用户品牌。通过匠心品质的家具家居产品，极致的>    线上线下体验，和懂生活、有品位、爱分享的朋友们，共同创造更美好的生活。">
      <meta name="keywords" content="LANEHUB, 瓴里, 瓴里生活, LANEHUB Lifestyle, 家具, 家居, 新零售, 生活方式 - 关于我们">`;
    },
    components: {
      LifeStyle, LaneHubHeader, Banner, ImageText, DownLoad, LaneHubFooter
    },
    asyncData({store}) {
      store.registerModule('aboutData', aboutData);
    },
    mounted() {
      this.$store.registerModule('aboutData', aboutData);
    },
    computed: {
      aboutData() {
        return this.$store.state.aboutData;
      }
    },
    destroyed() {
      this.$store.unregisterModule('aboutData', aboutData);
    }
  };
</script>
<style lang="scss" scoped>
  .about_us {
    background-color: #fff;
  }
</style>
