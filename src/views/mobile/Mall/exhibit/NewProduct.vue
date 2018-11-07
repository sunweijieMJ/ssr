<template>
  <div class="exhibit-list">
    <div class="nav">
      <span class="iconfont icon-nav_ic_return" style="font-size: 0.46rem;" @click="goBack"></span>
      <span>{{title}}</span>
      <span class="iconfont icon-detail_ic_shoppingba" style="font-size: 0.46rem;" @click.stop="intercept"></span>
    </div>
    <div v-infinite-scroll="infinite"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <Production :product_list="product_list"></Production>
      <!-- <open-app></open-app> -->
      <Loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="true"></Loading>
      <div class="cate_now" v-if="product_list.length === 0">
        <CommentNull :text="'还没有此类商品哟~'"></CommentNull>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';
import new_product from '../../../../store/mall/new_product.js';
// import {OpenApp} from '../../../../components/mobile/button';
import frequent from '../../../../mixins/frequent';
import {LifeStyle, CommentNull, Loading} from '../../../../components/mobile/business';
import Production from './newpro/Production';
export default {
  mixins: [frequent],
  components: {
    Loading,
    LifeStyle,
    // OpenApp,
    CommentNull,
    Production
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
    // let pro_id = route.query.id;
    store.registerModule('new_product', new_product);
    // return Promise.all([store.dispatch('new_product/getNewProduct', {id: pro_id})]);
  },
  mounted() {
    this.$store.registerModule('new_product', new_product, {id: this.$route.query.id, preserveState: true});
  },
  methods: {
    goBack(){
      this.$router.go(-1);
    },
    infinite() {
      let that = this;
      that.$store.dispatch('new_product/getNewProduct', {id: this.$route.query.id});
    }
  },
  computed: {
    ...mapState({
      product_list: (store) => store.new_product.product_list,
      loadInfo: (store) => store.new_product.loadInfo,
      title: (store) => store.new_product.title
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
<style lang="scss">
.cate_now > .comment-null{
  border-top: none !important;
}
</style>

