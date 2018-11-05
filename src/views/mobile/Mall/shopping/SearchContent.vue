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

    <div  v-if="!found && list.length > 0">
      <div v-infinite-scroll="infinite"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <ul class="clearfix" v-if="list">
          <li v-for="(item,index) in list" :key="index" @click="assign('product_detail',item.id)">
            <img :src="item.basic.list_headimg | imageSize('330x330')" alt="">
            <div class="desc">
              <span class="lanehub bigtitle" v-if="titleJudge(item.basic.flags)">LANEHUB</span>
              <span v-else class="bigtitle">{{item.basic.list_subtitle}}</span>
              <p class="desc-title">{{item.basic.list_title}}</p>
              <p class="value" :class="{gray : !finely(item.basic.flags)}">
                  <i>￥</i>
                  <span v-if="item.optionsMaxPrice === item.optionsMinPrice">{{item.optionsMinPrice/100}}</span>
                  <span v-else>{{item.optionsMinPrice/100}}-{{item.optionsMaxPrice/100}}</span>
              </p>
              <div class="min-title" :class="{grayfine : !finely(item.basic.flags)}">
                <span v-for="(flag,index) in item.basic.flags" :key="index" v-if="flag.visible">{{flag.title}}</span>
              </div>
            </div>
          </li>
          <div class="clear"></div>
        </ul>
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
import SearchPage from './SearchPage2.vue';
import EmptyPage from './EmptyPage.vue';
export default {
  name: 'SearchContent',
  mixins: [frequent],
  components: {
    Loading, LifeStyle, OpenApp, SearchPage, EmptyPage
  },
  data(){
    return{
      imageSize,
      priceFilter,
      istrue: 0,
      found: false,
      proid: -1,
      key_word: this.$route.params.key ? this.$route.params.key : '',
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
    return Promise.all([store.dispatch('search_list/getProductList', {id: route.params.id ? route.params.id : 0, key: route.params.key})]);
  },
  mounted() {
    this.key_word = this.$route.params.key;
    this.$store.registerModule('search_list', searchList, {preserveState: true});
  },
  destroyed() {
    this.$store.unregisterModule('search_list', searchList);
  },
  methods: {
    // 返回商品列表
    returnShopList(){
      this.$router.push({name: 'ShopList'});
    },
    localSearch(val, keywords){
      this.key_word = keywords;
      this.found = val;
      this.$store.dispatch('search_list/getProductList2', {id: this.$route.params.id ? this.$route.params.id : 0, key: keywords});
    },
    cancelSearch(){
      this.found = false;
    },
    infinite() {
      let that = this;
      that.$store.dispatch('search_list/getProductList', {id: this.$route.params.id, key: this.$route.params.key});
    },
    titleJudge(val) {
      if(!val) return true;
      let newArr = [];
      for(let i = 0; i < val.length; i++){
        newArr.push(val[i].visible);
      }
      if(newArr.indexOf(0) !== -1){
        return true;
      }else{
        return false;
      }
    },
    finely(val){
      let newVal = [];
      for(let i = 0; i < val.length; i++){
        newVal.push(val[i].title);
      }
      if(newVal.indexOf('售罄') !== -1){
        return false;
      }else{
        return true;
      }
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
    // width: 7.5rem;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
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


.clear{
    clear: both;
  }
  ul{
    margin-top: 0.88rem;
    width: 6.9rem;
    height: 100%;
    padding: 0.29rem 0.3rem 0.31rem 0.3rem;
    li{
      width: 3.3rem;
      background-color: #ffffff;
      float: left;
      margin: 0 0.3rem 0.2rem 0;
      &:nth-child(2n){
        margin-right: 0;
      }
      img {
        width: 3.3rem;
        border-radius: 4px;
      }
      .desc{
        padding: 0.26rem 0rem 0 0;
        width: 2.9rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        .bigtitle{
          font-size: 0.26rem;
          line-height: 0.26rem;
          font-weight: 300;
          color: $themeColor;
        }
        .lanehub{
          border-radius: 2px;
          // background-color: $linkBlue;
          // color: #ffffff;
          padding: 0 0.08rem;
          font-size: 0.26rem;
          line-height: 0.26rem;
        }
        .desc-title{
          font-size: 0.28rem;
          line-height: 0.28rem;
          margin-top: 0.1rem;
          margin-bottom: 0.14rem;
          font-weight: normal;
          color: $themeColor;
        }
        .value{
          margin-bottom: 0.12rem;
        }
        span{
          font-size: 0.3rem;
          font-weight: 300;
          font-weight: 300;
          line-height: 0.3rem;
        }
        p{
          &.gray{
            i{
              color: $subColor;
            }
            span{
              color: $subColor;
            }
          }
          line-height: 0.3rem;
          span{
            color: $mallRed;
            line-height: 0.3rem;
            font-size: 0.3rem;
            font-weight: 400;
          }
          i{
            font-size: 0.24rem;
            line-height: 0.24rem;
            font-style: normal;
            color: $mallRed;
            font-weight: 400;
          }
        }
        .min-title{
          position: relative;
          line-height: 0.24rem;
          margin-bottom: 0.12rem;
          color: #4974a2;
          &.grayfine{
            span{
              color: $subColor;
            }
          }
          span{
            font-size: 0.24rem;
            font-weight: 300;
            line-height: 0.24rem;
            padding-left: 0.1rem;
            padding-right: 0.1rem;
            &:first-of-type{
              padding-left: 0;
            }
            &:before{
              content: "|";
              position: absolute;
              margin-left: -0.13rem;
            }
            &:first-of-type:before{
              content: "";
            }
          }
        }

      }
    }
  }
</style>
