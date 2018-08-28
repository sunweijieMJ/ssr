<template>
  <div class="about_us">
    <LaneHubHeader></LaneHubHeader>
    <Banner :banner="aboutData.mobile.banner_msg"></Banner>
    <ImageText :imageText="aboutData.mobile.image_text"></ImageText>
    <DownLoad></DownLoad>
    <LaneHubFooter></LaneHubFooter>
  </div>
</template>
<script>
  import LaneHubHeader from '../../../components/mobile/official/LaneHubHeader';
  import Banner from '../../../components/mobile/official/Banner';
  import ImageText from '../../../components/mobile/official/ImageText';
  import DownLoad from '../../../components/mobile/official/DownLoad';
  import LaneHubFooter from '../../../components/mobile/official/LaneHubFooter';
  import aboutData from '../../../store/official/aboutData.js';

  export default {
    title() {
      return 'Lanehub - 关于我们';
    },
    meta() {
      return `<meta name="description" content="Lane hub 关于我们">
      <meta name="keywords" content="关于我们">`;
    },
    components: {
      LaneHubHeader, Banner, ImageText, DownLoad, LaneHubFooter
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
