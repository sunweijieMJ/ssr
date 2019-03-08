<template>
  <div>
    <div v-show="!found" class="searcher">
      <div class="inputs-box">
        <i class="iconfont icon-nav_ic_return" @click="returnShopList"></i>
        <div class="input sure-sea">
          <input class="del-input" v-model="key_word" type="text" @focus="searchUser" placeholder="搜索商品">
          <i class="iconfont icon-delete_ic_grey_bg_" @click="empty()"></i>
        </div>
        <i class="iconfont icon-detail_ic_shoppingba" style="font-size: 0.46rem;" @click.stop="intercept"></i>
      </div>
    </div>

    <div v-if="!found && list.length > 0">
      <div v-infinite-scroll="infinite"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <div class="clearfix" v-if="list">
          <ShopList2 :shopList="list"></ShopList2>
        </div>
        <Loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="true"></Loading>
      </div>
    </div>
    <div v-if="found">
      <SearchPage @localSearch="localSearch" @cancelSearch= "cancelSearch" :judge_del="judge_del" :key_words="key_word" :hotlist="hotlist" :history="history" :proid="proid"></SearchPage>
    </div>
    <div v-if="!found && list.length === 0">
      <EmptyPage></EmptyPage>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';
import searchList from '../../../../store/mall/search_list.js';
import imageSize from '../../../../utils/filters/imageSize.js';
import priceFilter from '../../../../utils/filters/priceFilter';
import frequent from '../../../../mixins/frequent';
import {OpenApp} from '../../../../components/mobile/button';
import {LifeStyle, Loading} from '../../../../components/mobile/business';
import ShopList2 from '../../../../components/mobile/business/ShopList';
import SearchPage from './SearchPage2.vue';
import EmptyPage from './EmptyPage.vue';
export default {
  name: 'SearchContent',
  mixins: [frequent],
  components: {
    Loading, LifeStyle, OpenApp, SearchPage, EmptyPage, ShopList2
  },
  data(){
    return{
      imageSize,
      priceFilter,
      istrue: 0,
      found: false,
      proid: -1,
      key_word: this.$route.query.key ? this.$route.query.key : '',
      judge_del: false
    };
  },
  title() {
    return '搜索商品列表';
  },
  meta() {
    return `<meta name="description" content="搜索商品列表">
    <meta name="keywords" content="搜索商品列表">`;
  },
  asyncData({store, route}) {
    store.registerModule('search_list', searchList);
    return Promise.all([store.dispatch('search_list/getProductList', {id: route.query.id ? route.query.id : 0, key: route.query.key})]);
  },
  mounted() {
    this.key_word = this.$route.query.key;
    this.$store.registerModule('search_list', searchList, {preserveState: true});

    // this.$store.dispatch('search_list/getProductList', {id: this.$route.query.id ? this.$route.query.id : 0, key: this.$route.query.key})
  },
  destroyed() {
    this.$store.unregisterModule('search_list', searchList);
  },
  methods: {
    // 返回商品列表
    returnShopList(){
      this.$router.back();
    },
    localSearch(val, keywords){
      this.key_word = keywords;
      this.found = val;
      this.$store.dispatch('search_list/getProductList2', {id: this.$route.query.id ? this.$route.query.id : 0, key: keywords});
    },
    cancelSearch(){
      this.found = false;
    },
    infinite() {
      let that = this;
      that.$store.dispatch('search_list/getProductList', {id: this.$route.query.id ? this.$route.query.id : 0, key: this.key_word});
    },
    searchUser() {

      this.found = true;
      this.$store.dispatch('search_list/getHot');
      this.$store.dispatch('search_list/getHistory');
    },
    empty(){
      // this.key_word = '';
      this.judge_del = true;
      setTimeout(res => {
        this.judge_del = false;
      }, 200);
      this.found = true;
      this.$store.dispatch('search_list/getHot');
      this.$store.dispatch('search_list/getHistory');
    }
  },
  watch: {
    list(){
      this.judge_del = false;
    }
  },
  computed:{
    ...mapState({
      list: (store) => store.search_list.list,
      loadInfo: (store) => store.search_list.loadInfo,
      thinklist: (store) => store.search_list.thinklist,
      hotlist: (store) => store.search_list.hotlist,
      history: (store) => store.search_list.history
      // hotlist: (store) => store.search_list.hotlist
    }),
    loading() {
      return this.$store.state.search_list.loadInfo.loading;
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../../../../assets/scss/_base.scss';

.searcher{
  z-index: 99;
    width: 6.9rem;
    // width: 100%;
    position: fixed;
    top: 0;
    // left: 0;
    padding: 0.14rem 0.3rem;
    background-color: #fff;
    border-bottom: 0.01rem solid $borderColor;
    .inputs-box{
      width: 6.9rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .input {
      display: flex;
      align-items: center;
      justify-content: space-around;
      // width: 5.6rem;
      // height: 0.6rem;
      padding-left: 0.2rem;
      border-radius: 0.3rem;
      background-color: #f5f5f5;
      i {
        margin-right: 0.1rem;
        font-size: 0.3rem;
        color: #999;
        &:nth-of-type(2){
          padding-left: 0.1rem;
          margin-right: 0.2rem;
        }
      }
      input {
        width: 5.2rem;
        // height: 0.6rem;
        padding: 0;
        font-size:0.3rem;
        line-height: 0.6rem;
        outline: none;
        border: none;
        border-top-right-radius: 0.3rem;
        border-bottom-right-radius: 0.3rem;
        background-color:#f5f5f5;
        &::-webkit-input-placeholder {
          font-size: 0.28rem;
          font-weight: 300;
          line-height: 0.56rem;
          color: #888;
        }
        &:-moz-placeholder{
          font-size: 0.28rem;
          font-weight: 300;
          line-height: 0.56rem;
          color: #888;
        }
        &::-moz-placeholder{
          font-size: 0.28rem;
          font-weight: 300;
          line-height: 0.56rem;
          color: #888;
        }
        &:-ms-input-placeholder{
          font-size: 0.28rem;
          font-weight: 300;
          line-height: 0.56rem;
          color: #888;
        }
      }
    }
  }
  .clearfix{
    padding: 0.29rem 0.3rem 0.31rem 0.3rem;
    ul{
      margin-top: 0.88rem;
    }
  }
  
</style>
