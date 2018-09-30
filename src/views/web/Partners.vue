<template>
  <div class="products website">
    <Banner :banner="partnerData.web.banner_msg"></Banner>
    <ImageText :imageText="partnerData.web.image_text"></ImageText>
    <PartnerContent></PartnerContent>
    <DownLoad></DownLoad>
    <LaneHubFooter></LaneHubFooter>
  </div>
</template>
<script>
  import {Banner, ImageText, PartnerContent, DownLoad, LaneHubFooter} from '../../components/web/public';

  import partnerData from '../../store/official/partnerData.js';

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
      Banner, ImageText, PartnerContent, DownLoad, LaneHubFooter
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
