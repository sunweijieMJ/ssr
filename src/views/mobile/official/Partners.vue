<template>
  <div class="products">
    <template v-if="$route.path === '/Description/partners'">
      <life-style></life-style>
    </template>
    <template v-else>
      <laneHub-header></laneHub-header>
    </template>
    <banner :banner="partnerData.mobile.banner_msg"></banner>
    <image-text :imageText="partnerData.mobile.image_text"></image-text>
    <downLoad></downLoad>
    <laneHub-footer></laneHub-footer>
  </div>
</template>
<script>
  import partnerData from '../../../store/official/partnerData.js';
  import {LifeStyle} from '../../../components/mobile/business';
  import {LaneHubHeader, Banner, ImageText, DownLoad, LaneHubFooter} from '../../../components/mobile/official';

  export default {
    title() {
      return 'Lanehub 瓴里生活 JoyFull LifeStyle - 商业合作';
    },
    meta() {
      return `<meta name="description" content="LANEHUB 瓴里，创造愉悦生活方式的用户品牌。通过匠心品质的家具家居产品，极致的>    线上线下体验，和懂生活、有品位、爱分享的朋友们，共同创造更美好的生活。">
      <meta name="keywords" content="LANEHUB, 瓴里, 瓴里生活, LANEHUB Lifestyle, 家具, 家居, 新零售, 生活方式 - 商业合作">`;
    },
    asyncData({store}) {
      store.registerModule('partnerData', partnerData);
    },
    mounted() {
      this.$store.registerModule('partnerData', partnerData);
    },
    components: {
      LifeStyle, LaneHubHeader, Banner, ImageText, DownLoad, LaneHubFooter
    },
    computed: {
      partnerData() {
        return this.$store.state.partnerData;
      }
    },
    destroyed() {
      this.$store.unregisterModule('partnerData', partnerData);
    }
  };
</script>
