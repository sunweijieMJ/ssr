<template>
  <div class="about_us website">
    <Banner :banner="aboutData.web.banner_msg"></Banner>
    <ImageText :imageText="aboutData.web.image_text"></ImageText>
    <DownLoad></DownLoad>
    <LaneHubFooter></LaneHubFooter>
  </div>
</template>
<script>
  import {Banner, ImageText, DownLoad, LaneHubFooter} from '../../components/web/public';
  import aboutData from '../../store/official/aboutData.js';

  export default {
    title() {
      return 'Lanehub - 关于我们';
    },
    meta() {
      return `<meta name="description" content="Lanehub 关于我们">
      <meta name="keywords" content="about">`;
    },
    asyncData({store}) {
      store.registerModule('aboutData', aboutData);
    },
    mounted() {
      this.$store.registerModule('aboutData', aboutData);
    },
    components: {
      ImageText, Banner, DownLoad, LaneHubFooter
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
