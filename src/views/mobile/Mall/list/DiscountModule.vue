<template>
  <div class="discount-module">
    <public-title :pageTitle="'瓴里优惠专区'" v-if="!(response.__platform === 'app' || isTencent)"></public-title>
    <a class="banner" href="javascript:;">
      <img :src="'https://pic2.lanehub.cn/production/7467c39a2538cd0f722d5bc5e7a8244b.jpg?x-oss-process=style/m-00007' | imageSize('750x422')" alt="">
    </a>
    <div v-infinite-scroll="infinite"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <hot-module-list :list="discount_module"></hot-module-list>
      <loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="true"></loading>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import hidetitle from '../../../../mixins/hidetitle.js';
  import discount_module from '../../../../store/mall/discount_module.js';
  import {VueSwiper} from '../../../../components/mobile/public';
  import {PublicTitle, HotModuleList, Loading} from '../../../../components/mobile/business';

  export default {
    title() {
      return '瓴里优惠专区';
    },
    meta() {
      return `<meta name="description" content="瓴里优惠专区">
      <meta name="keywords" content="瓴里优惠专区">`;
    },
    asyncData({store}) {
      store.registerModule('discount_module', discount_module);
    },
    components: {
      PublicTitle, VueSwiper, HotModuleList, Loading
    },
    mixins: [hidetitle],
    mounted() {
      let that = this;
      that.$store.registerModule('discount_module', discount_module, {preserveState: true});
    },
    destroyed() {
      this.$store.unregisterModule('discount_module', discount_module);
    },
    methods: {
      infinite(){
        let that = this;
        that.$store.dispatch('discount_module/getDiscountModule', that.$route.query.module_type);
      }
    },
    computed: mapState({
      discount_module: (store) => store.discount_module.discount_module,
      loadInfo: (store) => store.discount_module.loadInfo,
      loading: (store) => store.discount_module.loadInfo.loading
    })
  };
</script>
<style lang="scss" scoped>
  .discount-module {
    .banner {
      display: flex;
      img {
        width: 100%;
        height: 4.22rem;
      }
    }
  }
</style>
