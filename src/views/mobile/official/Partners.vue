<template>
  <div class="products">
    <LaneHubHeader></LaneHubHeader>
    <Banner :banner="partnerData.mobile.banner_msg"></Banner>
    <ImageText :imageText="partnerData.mobile.image_text"></ImageText>
    <DownLoad></DownLoad>
    <LaneHubFooter></LaneHubFooter>
  </div>
</template>
<script>
import LaneHubHeader from '../../../components/mobile/official/LaneHubHeader';
import ImageText from '../../../components/mobile/official/ImageText';
import Banner from '../../../components/mobile/official/Banner';
import DownLoad from '../../../components/mobile/official/DownLoad';
import LaneHubFooter from '../../../components/mobile/official/LaneHubFooter';
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
    LaneHubHeader, Banner, ImageText, DownLoad, LaneHubFooter
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
