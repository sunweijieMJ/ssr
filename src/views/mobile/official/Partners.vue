<template>
  <div class="partners">
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
      return 'Lanehub - 商业合作';
    },
    meta() {
      return `<meta name="description" content="Lanehub 商业合作">
      <meta name="keywords" content="partners">`;
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
<style lang="scss" scoped>
  .partners {
    background-color: #fff;
  }
</style>
