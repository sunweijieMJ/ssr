<template>
  <div>
    <div class="pro-list" v-show="!found">
      <!-- <life-style></life-style> -->
      <div class="search">
        <div class="input-box">
          <div class="input">
            <i class="iconfont icon-search_lb_searchCop"></i>
            <input type="text" placeholder="搜索商品" @focus="searchUser">
          </div>
          <i class="iconfont icon-detail_ic_shoppingba" style="font-size: 0.46rem; color: #222;" @click.stop="intercept"></i>
        </div>
      </div>
      <div class="tab-box">
        <div class="shop_tab">
          <div class="s-tab" v-for="(tab ,tindex) in categray_list.children" :key="tindex" :class="{active:istrue == tindex}" @click="jumpTab(tindex, tab.obj.id)">

            <div class="con">{{tab.obj.name}}</div>
            <div :class="{botline:istrue == tindex}"></div>
          </div>
        </div>
      </div>
      <div v-infinite-scroll="infinite"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
        <ul class="clearfix" v-if="list.length > 0">
          <li v-for="(item,index) in list" :key="index" @click="assign('product_detail',item.id)">
            <img v-lazy="imageSize(item.basic.list_headimg, '330x330')" alt="">
            <div class="desc">
              <span class="lanehub bigtitle" v-if="titleJudge(item.basic.flags)">LANEHUB</span>
              <span v-else class="bigtitle">{{item.basic.list_subtitle}}</span>
              <div class="desc-title">{{item.basic.list_title}}</div>
              <p class="value" :class="{gray : !finely(item.basic.flags)}">
                  <i>￥</i>
                  <span v-if="item.optionsMaxPrice === item.optionsMinPrice">{{item.optionsMinPrice/100}}</span>
                  <span v-else>{{item.optionsMinPrice/100}}-{{item.optionsMaxPrice/100}}</span>
              </p>
              <div class="min-title" :class="{grayfine : !finely(item.basic.flags)}">
                <span v-for="(flag,index) in item.basic.flags" :key="index" v-if="flag.visible">{{flag.title}}</span>
              </div>
              <!-- <div class="min-title grayfine" v-else>
                <span v-for="(flag,index) in item.basic.flags" :key="index" v-if="flag.visible">{{flag.title}}</span>
              </div> -->
            </div>
          </li>
          <div class="clear"></div>
        </ul>
        <open-app></open-app>
        <Loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="true"></Loading>
      </div>
      <div class="cate_now" v-if="!found && list.length === 0 && loadingJudge">
        <CommentNull :text="'还没有此类商品哟~'"></CommentNull>
      </div>
    </div>

    <div v-show="found">
      <SearchPage @fromSearch="fromSearch" @cancelSearch= "cancelSearch" :hotlist="hotlist" :history="history" :proid="proid"></SearchPage>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';
import product_list from '../../../../store/mall/product_list.js';
import imageSize from '../../../../utils/filters/imageSize.js';
import priceFilter from '../../../../utils/filters/priceFilter';
import frequent from '../../../../mixins/frequent';
import {OpenApp} from '../../../../components/mobile/button';
import {LifeStyle, CommentNull, Loading} from '../../../../components/mobile/business';
import SearchPage from './SearchPage.vue';
import wechat from '../../../../mixins/wechat.js';
export default {
  name: 'ShopList',
  mixins: [frequent, wechat],
  components: {
    Loading, LifeStyle, OpenApp, SearchPage, CommentNull
  },
  data(){
    return{
      imageSize,
      priceFilter,
      istrue: 0,
      found: false,
      proid: -1,
      loadingJudge: false // ETC 没有数据前的页面显示判断
    };
  },
  title() {
    return '商城列表';
  },
  meta() {
    return `<meta name="description" content="商城列表">
    <meta name="keywords" content="商城列表">`;
  },
  asyncData({store}) {
    store.registerModule('pro_list', product_list);
    return Promise.all([
      store.dispatch('pro_list/getCategray'),
      store.dispatch('pro_list/getLogo', {})
    ]);
  },
  mounted() {
    if(this.categray_list.children){
      this.$store.registerModule('pro_list', product_list, {preserveState: true});
      this.$store.dispatch('pro_list/getProductList', {id: this.categray_list.children[0].obj.id}).then(() => {
        this.loadingJudge = true;
      });
    }
    // 微信分享
    const link = window.location.href;
    const title = '瓴里商城';
    const desc = '一起创造愉悦的生活方式';
    const imgUrl = this.logo;
    this.wxInit(link, title, desc, imgUrl);
  },
  destroyed() {
    this.$store.unregisterModule('pro_list', product_list);
  },
  methods: {
    // 回到商品列表
    fromSearch(){
      this.found = false;
    },
    infinite() {
      this.$store.dispatch('pro_list/getProductList', {id: this.proid});
    },
    // tab 切换
    jumpTab(tindex, id){
      this.istrue = tindex;
      this.proid = id;
      this.$store.dispatch('pro_list/getProductList2', {id: this.proid});
      this.$store.dispatch('pro_list/tabChange', false);
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
    searchUser(){
      this.found = true;
      this.$store.dispatch('pro_list/getHot');
      this.$store.dispatch('pro_list/getHistory');
    },
    cancelSearch(){
      this.found = false;
    }
  },
  computed: {
    ...mapState({
      list: (store) => store.pro_list.list,
      loadInfo: (store) => store.pro_list.loadInfo,
      tab: (store) => store.pro_list.tab,
      categray_list: (store) => store.pro_list.categray_list,
      hotlist: (store) => store.pro_list.hotlist,
      history: (store) => store.pro_list.history,
      logo: (store) => store.pro_list.logo
    }),
    loading() {
      return this.$store.state.pro_list.loadInfo.loading;
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../../../../assets/scss/_base.scss';
@import './shopList.scss';
</style>
<style>
.cate_now > .comment-null{
  border-top: none !important;
}

</style>
