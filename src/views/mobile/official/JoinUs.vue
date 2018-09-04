<template>
  <div class="product">
    <template v-if="$route.path === '/Description/joinus'">
      <life-style></life-style>
    </template>
    <template v-else>
      <laneHub-header></laneHub-header>
    </template>
    <smart-banner :bannerMsg="joinData.mobile.banner_msg"></smart-banner>
    <join-text :joinText="joinData.mobile.image_text"></join-text>
    <downLoad></downLoad>
    <laneHub-footer></laneHub-footer>
  </div>
</template>
<script>
  import joinData from '../../../store/official/joinData.js';
  import {LifeStyle} from '../../../components/mobile/business';
  import {LaneHubHeader, SmartBanner, JoinText, DownLoad, LaneHubFooter} from '../../../components/mobile/official';

  export default {
    title() {
      return 'Lanehub - 加入我们';
    },
    meta() {
      return `<meta name="description" content="Lanehub 加入我们">
      <meta name="keywords" content="加入我们">`;
    },
    asyncData({store}) {
      store.registerModule('joinData', joinData);
    },
    mounted() {
      this.$store.registerModule('joinData', joinData);
    },
    components: {
      LifeStyle, LaneHubHeader, SmartBanner, JoinText, DownLoad, LaneHubFooter
    },
    computed: {
      joinData() {
        return this.$store.state.joinData;
      }
    },
    beforeDestroy() {
      this.$store.unregisterModule('joinData', joinData);
    }
  };
</script>

