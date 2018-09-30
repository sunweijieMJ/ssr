<template>
  <div class="joinus website">
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
      return 'Lanehub 瓴里生活 JoyFull LifeStyle - 加入我们';
    },
    meta() {
      return `<meta name="description" content="LANEHUB 瓴里，创造愉悦生活方式的用户品牌。通过匠心品质的家具家居产品，极致的>    线上线下体验，和懂生活、有品位、爱分享的朋友们，共同创造更美好的生活。">
      <meta name="keywords" content="LANEHUB, 瓴里, 瓴里生活, LANEHUB Lifestyle, 家具, 家居, 新零售, 生活方式 - 加入我们">`;
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
