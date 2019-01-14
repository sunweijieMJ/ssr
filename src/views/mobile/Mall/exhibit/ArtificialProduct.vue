<template>
  <div class="exhibit-list">
    <!-- <div class="nav">
      <span class="iconfont icon-nav_ic_return" style="font-size: 0.46rem;" @click="goBack"></span>
      <span>{{title}}</span>
      <span class="iconfont icon-detail_ic_shoppingba" style="font-size: 0.46rem;" @click.stop="intercept"></span>
    </div> -->
    <div v-infinite-scroll="infinite"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <div v-if="textarea !== ''" class="rich-text f-w-b">
        <p v-html="textarea"></p>
      </div>
      <div v-else class="f-w-t">
        <p>{{title}}</p>
      </div>
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
import artificial from '../../../../store/mall/artificial.js';
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
    return '榜单详情';
  },
  meta() {
    return `<meta name="description" content="Lanehub 榜单详情">
    <meta name="keywords" content="榜单详情">`;
  },
  asyncData({store, route}) {
    let pro_id = route.query.module_id;
    store.registerModule('artificial', artificial);
    return Promise.all([store.dispatch('artificial/getNewProduct', {id: pro_id})]);
  },
  mounted() {
    this.$store.registerModule('artificial', artificial, {id: this.$route.query.module_id, preserveState: true});
  },
  methods: {
    goBack(){
      this.$router.go(-1);
    },
    infinite() {
      let that = this;
      that.$store.dispatch('artificial/getNewProduct', {id: this.$route.query.module_id});
    }
  },
  computed: {
    ...mapState({
      product_list: (store) => store.artificial.product_list,
      loadInfo: (store) => store.artificial.loadInfo,
      title: (store) => store.artificial.title,
      textarea: (store) => store.artificial.textarea
    })
  }
};
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .exhibit-list {
    background-color: white;
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
    .f-w-b{
      padding:0.3rem 0.3rem 0 0.3rem;
    }
    .f-w-t{
      padding:0.3rem 0.3rem 0 0.3rem;
      font-size:0.48rem;
      font-weight:400;
      color:rgba(34,34,34,1);
    }
  }
</style>
<style lang="scss">
  @import '../../../../assets/scss/component/_richtext.scss';
  .cate_now > .comment-null{
    border-top: none !important;
  }
</style>

