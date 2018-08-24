<template>
  <div class="products">
    <Banner :banner="partnerData.web.banner_msg"></Banner>
    <ImageText :imageText="partnerData.web.image_text"></ImageText>
    <PartnerContent></PartnerContent>
    <DownLoad></DownLoad>
    <LaneHubFooter></LaneHubFooter>
  </div>
</template>
<script>
import Banner from '../../components/web/public/Banner';
import ImageText from '../../components/web/public/ImageText';
import PartnerContent from '../../components/web/other/PartnerContent';
import DownLoad from '../../components/web/public/DownLoad';
import LaneHubFooter from '../../components/web/public/LaneHubFooter';
import partnerData from '../../store/official/partnerData.js';

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
  components: {Banner, ImageText, PartnerContent, DownLoad, LaneHubFooter},
  computed: {
    partnerData() {
      return this.$store.state.partnerData;
    }
  }
};
</script>
