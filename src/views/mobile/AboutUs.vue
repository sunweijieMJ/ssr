<template>
  <div class="about_us">
    <!-- <div class="testmodule">{{ momentCount }}</div> -->
    <!-- <div class="testmodule">{{ dyContent.entity_user_info.content }}__aaa</div> -->
    <LaneHubHeader></LaneHubHeader>
    <Banner :banner="aboutData.mobile.banner_msg"></Banner>
    <!-- <div class="testmodule" @click="touchittest">testing</div> -->
    <ImageText :imageText="aboutData.mobile.image_text"></ImageText>
    <DownLoad></DownLoad>
    <LaneHubFooter></LaneHubFooter>
  </div>
</template>
<script>
import LaneHubHeader from '../../components/mobile/public/LaneHubHeader';
import Banner from '../../components/mobile/public/Banner';
import ImageText from '../../components/mobile/public/ImageText';
import DownLoad from '../../components/mobile/public/DownLoad';
import LaneHubFooter from '../../components/mobile/public/LaneHubFooter';

import about_img_01 from '../../assets/mobile/img/about_img_01.jpg';
import about_img_02 from '../../assets/mobile/img/about_img_02.jpg';
import about_img_03 from '../../assets/mobile/img/about_img_03.jpg';
import banner_url from '../../assets/mobile/img/about_img_banner.jpg';
// 在这里导入模块
//import momentModule from '../../store/dynamic/moment';
import {mapGetters} from 'vuex';

export default {
  title() {
    return 'Lanehub - 关于我们';
  },
  meta() {
    return `<meta name="description" content="Lane hub 关于我们">
    <meta name="keywords" content="${this.dyContent.entity_user_info.content}">`;
  },
  components: {
    LaneHubHeader, Banner, ImageText, DownLoad, LaneHubFooter
  },
  asyncData({store, router}) {
    console.log("it is running async");
    //store.registerModule('moment', momentModule);
    return Promise.all([
      store.dispatch('getcommonDynamic')
    ]);
    // store.dispatch('moment/inc');
    // return store.dispatch('moment/fetchMomentList');
  },
  computed: {
    ...mapGetters({
      'dyContent' : 'getdynamic'
    }),
    momentCount() {
      return this.$store.state.count++;
    },
    aboutData() {
      return this.$store.state.aboutData;
    }
  },
  methods: {
    touchittest() {
      //this.$store.registerModule('moment', momentModule);
      Promise.all([
        this.$store.dispatch('getcommonDynamic')
      ]).then(() => {

      })
    }
  }
};
</script>
<style scoped>
.testmodule {
  width:300px;
  line-height: 30px;
  background-color: #ccc;
  font-size:0.32rem;
}
</style>
