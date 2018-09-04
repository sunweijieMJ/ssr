<template>
  <div class="about_us">
    <template v-if="$route.path === '/Description/about_us'">
      <life-style></life-style>
    </template>
    <template v-else>
      <laneHub-header></laneHub-header>
    </template>
    <banner :banner="aboutData.mobile.banner_msg"></banner>
    <image-text :imageText="aboutData.mobile.image_text"></image-text>
    <downLoad></downLoad>
    <laneHub-footer></laneHub-footer>
  </div>
</template>
<script>
  import aboutData from '../../../store/official/aboutData.js';
  import {LifeStyle} from '../../../components/mobile/business';
  import {LaneHubHeader, Banner, ImageText, DownLoad, LaneHubFooter} from '../../../components/mobile/official';

  export default {
    title() {
      return 'Lanehub - 关于我们';
    },
    meta() {
      return `<meta name="description" content="Lanehub 关于我们">
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
