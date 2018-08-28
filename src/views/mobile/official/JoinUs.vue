<template>
  <div class="product">
    <LaneHubHeader></LaneHubHeader>
    <smart-banner :bannerMsg="joinData.mobile.banner_msg"></smart-banner>
    <join-text :joinText="joinData.mobile.image_text"></join-text>
    <DownLoad></DownLoad>
    <LaneHubFooter></LaneHubFooter>
  </div>
</template>
<script>
  import LaneHubHeader from '../../../components/mobile/official/LaneHubHeader';
  import SmartBanner from '../../../components/mobile/official/SmartBanner.vue';
  import JoinText from '../../../components/mobile/official/JoinText.vue';
  import DownLoad from '../../../components/mobile/official/DownLoad';
  import LaneHubFooter from '../../../components/mobile/official/LaneHubFooter';
  import joinData from '../../../store/official/joinData.js';

  export default {
    title() {
      return 'Lanehub - 加入我们';
    },
    meta() {
      return `<meta name="description" content="Lane hub 加入我们">
      <meta name="keywords" content="lanehub-加入我们">`;
    },
    asyncData({store}) {
      store.registerModule('joinData', joinData);
    },
    components: {
      LaneHubHeader, SmartBanner, JoinText, DownLoad, LaneHubFooter
    },
    computed: {
      joinData() {
        return this.$store.state.joinData;
      }
    },
    destroyed() {
      this.$store.unregisterModule('joinData', joinData);
    }
  };
</script>

