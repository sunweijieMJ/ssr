<template>
  <div class="products">
    <template v-if="$route.path === '/partners'">
      <life-style></life-style>
    </template>
    <template v-else>
      <LaneHubHeader></LaneHubHeader>
    </template>
    <Banner :banner="partnerData.mobile.banner_msg"></Banner>
    <ImageText :imageText="partnerData.mobile.image_text"></ImageText>
    <DownLoad></DownLoad>
    <LaneHubFooter></LaneHubFooter>
  </div>
</template>
<script>
  import {LifeStyle} from '../../../components/mobile/business';
  import {LaneHubHeader, Banner, ImageText, DownLoad, LaneHubFooter} from '../../../components/mobile/official';
  import partnerData from '../../../store/official/partnerData.js';

  export default {
    title() {
      return 'Lanehub - 商业合作';
    },
    meta() {
      return `<meta name="description" content="Lane hub 商业合作">
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
