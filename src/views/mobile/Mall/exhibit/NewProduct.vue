<template>
  <div class="exhibit-list">
    <div class="nav">
      <span class="iconfont icon-nav_ic_return" style="font-size: 0.46rem;"></span>
      <span>新品发布</span>
      <span class="iconfont icon-detail_ic_shoppingba" style="font-size: 0.46rem;"></span>
    </div>
    <div v-infinite-scroll="infinite"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <Production :product_list="product_list"></Production>
      <open-app></open-app>
      <Loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="true"></Loading>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';
import new_product from '../../../../store/mall/new_product.js';
import {OpenApp} from '../../../../components/mobile/button';
import {LifeStyle, CommentNull, Loading} from '../../../../components/mobile/business';
import Production from './Production';
export default {
  components: {
    Loading, LifeStyle, OpenApp, CommentNull, Production
  },
  data(){
    return{

    };
  },
  title() {
    return '新品列表';
  },
  meta() {
    return `<meta name="description" content="Lanehub 新品列表">
    <meta name="keywords" content="新品列表">`;
  },
  asyncData({store, route}) {
    store.registerModule('new_product', new_product);
    return Promise.all([store.dispatch('new_product/getNewProduct', {})]);
  },
  mounted() {
    this.$store.registerModule('new_product', new_product, {preserveState: true});
  },
  methods: {
    infinite() {
      let that = this;
      that.$store.dispatch('new_product/getNewProduct', {id: 0});
    }
  },
  computed: {
    ...mapState({
      product_list: (store) => store.new_product.product_list,
      loadInfo: (store) => store.new_product.loadInfo
    })
  }
};
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .exhibit-list {
    .nav{
      z-index: 99;
      padding: 0.21rem 0.3rem;
      font-size: 0.36rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e5e5e5;
      position: fixed;
      top: 0;
      background-color: #fff;
      width: 6.9rem;
    }
  }
</style>

