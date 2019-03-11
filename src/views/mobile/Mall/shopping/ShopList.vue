<template>
  <div class="pro-box">
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
        <div class="bread" @click="goCateList">
          <span class="iconfont icon-download_ic_menu"></span>
        </div>
      </div>
      <!-- 二级搜索栏 -->
      <div class="tab2-box">
        <div class="tab-cate tab-cate1" :class="font_color_state1 ? 'hight' : ''" @click="searchOverlayOne">
          <span>全部家具</span>
          <span class="iconfont icon-login_ic_down1" v-if="font_color1"></span>
          <span class="iconfont icon-webicon216" v-if="!font_color1"></span>
        </div>
        <div class="tab-cate" :class="font_color_state2 ? 'hight' : ''" @click="searchOverlayTwo">
          <span>综合排序</span>
          <span class="iconfont icon-login_ic_down1" v-if="font_color2"></span>
          <span class="iconfont icon-webicon216" v-if="!font_color2"></span>
        </div>
      </div>
      <!-- 二级筛选列表 -->
      <div class="screen" v-show="second_search_state" @click="hiddenOverlay">
        <SecondSearchList @hiddenOverlay="hiddenOverlay"></SecondSearchList>
      </div>

      <div v-infinite-scroll="infinite"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
        <div v-if="list.length > 0">
          <ShopList2 :shopList="list"></ShopList2>
        </div>
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
import ShopList2 from '../../../../components/mobile/business/ShopList';
import {LifeStyle, CommentNull, Loading} from '../../../../components/mobile/business';
import SearchPage from './SearchPage.vue';
import wechat from '../../../../mixins/wechat.js';
import SecondSearchList from './secondsearch/SecondSearchList';
export default {
  name: 'ShopList',
  mixins: [frequent, wechat],
  components: {
    Loading, LifeStyle, OpenApp, SearchPage, CommentNull, ShopList2, SecondSearchList
  },
  data(){
    return{
      imageSize,
      priceFilter,
      istrue: 0,
      found: false,
      proid: this.$route.query.id ? this.$route.query.id : -1,
      second_search_state: false, // ETC 二级筛选状态层
      font_color1: true, // ETC 二级筛选字色
      font_color2: true,
      font_color_state1: false,
      font_color_state2: true,

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
      store.dispatch('pro_list/getCategoryList'),
      store.dispatch('pro_list/getLogo', {})
    ]);
  },
  mounted() {
    setTimeout(() => {
      if((document.querySelector('.active').offsetLeft + document.querySelector('.active').offsetWidth) > document.querySelector('.shop_tab').offsetWidth){
        document.querySelector('.active').offsetParent.scrollLeft = (document.querySelector('.active').offsetLeft) - document.querySelector('.shop_tab').offsetWidth + document.querySelector('.active').offsetWidth;
      }
    }, 200);

    document.querySelector('.screen').style.opacity = 0;

    // 微信分享
    const link = window.location.href;
    const title = '瓴里商城';
    const desc = '一起创造愉悦的生活方式';
    const imgUrl = this.logo;
    this.wxInit(link, title, desc, imgUrl);
    if(this.categray_list.children){
      this.$store.registerModule('pro_list', product_list, {preserveState: true});
      for (let i = 0; i < this.categray_list.children.length; i++) {
        if(this.$route.query && this.categray_list.children[i].obj.id === (this.$route.query.id * 1)){
          this.istrue = i;
          this.proid = this.categray_list.children[i].obj.id;
          return;
        }else{
          this.proid = this.categray_list.children[0].obj.id;
        }
      }
      this.$store.dispatch('pro_list/getProductList', {id: this.proid}).then(() => {
        this.loadingJudge = true;
      });
    }
  },
  destroyed() {
    this.$store.unregisterModule('pro_list', product_list);
  },
  methods: {
    // 隐藏二级搜索列表
    hiddenOverlay(name){
      this.second_search_state = false;
      if(this.font_color_state1){
        this.font_color1 = !this.font_color1;
      }else if(this.font_color_state2){
        this.font_color2 = !this.font_color2;
      }
    },
    // 二级筛选
    searchOverlayOne(){
      this.second_search_state = true;
      this.font_color2 = true;
      this.font_color_state2 = false;
      this.font_color1 = !this.font_color1;
      this.font_color_state1 = true;
      if(!this.font_color1){
        this.second_search_state = true;
        document.querySelector('.screen').style.opacity = 1;
      }else{
        document.querySelector('.screen').style.opacity = 0;
        this.second_search_state = false;
      }
    },
    // 二级筛选
    searchOverlayTwo(){
      this.font_color1 = true;
      this.font_color_state1 = false;
      this.second_search_state = true;
      this.font_color_state2 = true,
      this.font_color2 = !this.font_color2;
      if(!this.font_color2){
        this.second_search_state = true;
        document.querySelector('.screen').style.opacity = 1;
      }else{
        document.querySelector('.screen').style.opacity = 0;
        this.second_search_state = false;
      }
    },
    
    // hidden(o, i, s){
    //   let t = setInterval(() => {
    //     // i += s;
    //     o.style.opacity = i;
    //     if(i < 0) window.clearInterval(t);
    //   }, 500);
    // },
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
      // this.$router.replace({name: 'ShopList', query: {id: this.proid}});
      // this.$router.push({name: 'ShopList', query: {id: this.proid}});
      history.pushState(null, null, `shop_list?id=${this.proid}`);
      this.$store.dispatch('pro_list/getProductList2', {id: this.proid});
      this.$store.dispatch('pro_list/tabChange', false);
    },
    searchUser(){
      this.found = true;
      this.$store.dispatch('pro_list/getHot');
      this.$store.dispatch('pro_list/getHistory');
    },
    cancelSearch(){
      this.found = false;
    },
    // 去商品类目列表页
    goCateList(){
      this.$router.push({name: 'ShopCategory'});
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
  },
  watch: {
    $route(to, from) {
      if(to !== from){
        location.reload();
      }
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
