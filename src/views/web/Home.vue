<template>
  <div class="home">
    <Banner :banner="homeData.web.banner_msg"></Banner>
    <ImageText :imageText="homeData.web.image_text"></ImageText>
    <LaneHubApp></LaneHubApp>
    <LaneHubFooter></LaneHubFooter>
  </div>
</template>
<script>
  import ImageText from '../../components/web/public/ImageText';
  import Banner from '../../components/web/public/Banner';
  import LaneHubApp from '../../components/web/other/LaneHubApp';
  import LaneHubFooter from '../../components/web/public/LaneHubFooter';
  import homeData from '../../store/official/homeData.js';

  export default {
    title() {
      return 'Lanehub - 首页';
    },
    meta() {
      return `<meta name="description" content="Lanehub 首页">
      <meta name="keywords" content="home">`;
    },
    asyncData({store}) {
      store.registerModule('homeData', homeData);
    },
    components: {
      Banner, ImageText, LaneHubApp, LaneHubFooter
    },
    computed: {
      homeData() {
        return this.$store.state.homeData;
      }
    }
  };
</script>

