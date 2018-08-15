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
import LaneHubHeader from '../../components/mobile/public/LaneHubHeader';
import ImageText from '../../components/mobile/public/ImageText';
import Banner from '../../components/mobile/public/Banner';
import DownLoad from '../../components/mobile/public/DownLoad';
import LaneHubFooter from '../../components/mobile/public/LaneHubFooter';

export default {
  title() {
    return 'Lanehub - 商业合作';
  },
  meta() {
    return `<meta name="description" content="Lane hub 商业合作">
    <meta name="keywords" content="partners">`;
  },
  components: {
    LaneHubHeader, Banner, ImageText, DownLoad, LaneHubFooter
  },
  computed: {
    partnerData() {
      return this.$store.state.partnerData;
    }
  }
};
</script>
