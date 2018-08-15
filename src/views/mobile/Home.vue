<template>
  <div class="home">
    <LaneHubHeader></LaneHubHeader>
    <Banner :banner="homeData.mobile.banner_msg"></Banner>
    <ImageText :imageText="homeData.mobile.image_text"></ImageText>
    <DownLoadBtn></DownLoadBtn>
    <LaneHubFooter></LaneHubFooter>
  </div>
</template>
<script>
  import LaneHubHeader from '../../components/mobile/public/LaneHubHeader';
  import Banner from '../../components/mobile/public/Banner';
  import ImageText from '../../components/mobile/public/ImageText';
  import DownLoadBtn from '../../components/mobile/public/DownLoadBtn';
  import LaneHubFooter from '../../components/mobile/public/LaneHubFooter';

  export default {
    title() {
      return 'Lanehub - 首页';
    },
    meta() {
      return `<meta name="description" content="Lanehub 首页">
      <meta name="keywords" content="首页">`;
    },
    components: {
      LaneHubHeader, Banner, ImageText, DownLoadBtn, LaneHubFooter
    },
    computed: {
      homeData() {
        return this.$store.state.homeData;
      }
    }
  };
</script>
<style lang="scss" scoped>
  .home{
    .download_btn{
      margin: 0.8rem auto;
    }
  }
</style>

