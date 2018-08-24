<template>
  <div class="about_us">
    <LaneHubHeader></LaneHubHeader>
    <Banner :banner="aboutData.mobile.banner_msg"></Banner>
    <div class="testmodule">{{ momentCount }}</div>
    <div class="testmodule">{{ dyContent.entity_user_info.content }}__aaa</div>
    <div class="testmodule" @click="touchittest">testing</div>
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

// 在这里导入模块
import momentModule from '../../../store/dynamic/moment';
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
  asyncData({store}) {
    store.registerModule('aboutData', aboutData);

    console.log("it is running async");
    store.registerModule('moment', momentModule);
    return Promise.all([
      store.dispatch('getcommonDynamic')
    ]);
    store.dispatch('moment/inc');
    return store.dispatch('moment/fetchMomentList');
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
      // this.$store.registerModule('moment', momentModule);
      Promise.all([
        this.$store.dispatch('getcommonDynamic')
      ]).then(() => {

      })
    }
  }
};
</script>
