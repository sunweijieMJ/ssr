<template>
  <div class="discount-module">
    <public-title :pageTitle="'瓴里新品专区'" v-if="!(response.__platform === 'app' || isTencent)"></public-title>
    <vue-swiper :images="['https://pic2.lanehub.cn/production/7467c39a2538cd0f722d5bc5e7a8244b.jpg?x-oss-process=style/m-00007']"></vue-swiper>
    <div v-infinite-scroll="infinite"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <hot-module-list :list="newest_module"></hot-module-list>
      <loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="false"></loading>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import hidetitle from '../../../../mixins/hidetitle.js';
  import newest_module from '../../../../store/mall/newest_module.js';
  import {VueSwiper} from '../../../../components/mobile/public';
  import {PublicTitle, HotModuleList, Loading} from '../../../../components/mobile/business';

  export default {
    title() {
      return '瓴里新品专区';
    },
    meta() {
      return `<meta name="description" content="瓴里新品专区">
      <meta name="keywords" content="瓴里新品专区">`;
    },
    asyncData({store}) {
      store.registerModule('newest_module', newest_module);
    },
    components: {
      PublicTitle, VueSwiper, HotModuleList, Loading
    },
    mixins: [hidetitle],
    mounted() {
      let that = this;
      that.$store.registerModule('newest_module', newest_module, {preserveState: true});
    },
    destroyed() {
      this.$store.unregisterModule('newest_module', newest_module);
    },
    methods: {
      infinite(){
        let that = this;
        that.$store.dispatch('newest_module/getNewestModule', that.$route.query.module_type);
      }
    },
    computed: mapState({
      newest_module: (store) => store.newest_module.newest_module,
      loadInfo: (store) => store.newest_module.loadInfo,
      loading: (store) => store.newest_module.loadInfo.loading
    })
  };
</script>

