<template>
  <div class="about_us">
    <template v-if="$route.path === '/aboutus'">
      <life-style></life-style>
    </template>
    <template v-else>
      <LaneHubHeader></LaneHubHeader>
    </template>
    <Banner :banner="aboutData.mobile.banner_msg"></Banner>
    <ImageText :imageText="aboutData.mobile.image_text"></ImageText>
    <DownLoad></DownLoad>
    <LaneHubFooter></LaneHubFooter>
  </div>
</template>
<script>
  import {LifeStyle} from '../../../components/mobile/business';
  import {LaneHubHeader, Banner, ImageText, DownLoad, LaneHubFooter} from '../../../components/mobile/official';
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
      LifeStyle, LaneHubHeader, Banner, ImageText, DownLoad, LaneHubFooter
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
