<template>
  <div class="pro-box">
    <div class="pro-list" v-show="!found">
      <!-- <life-style></life-style> -->
      <div class="search">
        <div class="input-box">
          <div class="input">
            <i class="iconfont icon-search_lb_searchCop"></i>
            <input type="text" :placeholder="hotlist.length ? hotlist[0].text : '发现新的生活方式'" @focus="searchUser">
          </div>
          <i class="iconfont icon-detail_ic_shoppingba" style="font-size: 0.46rem; color: #222;" @click.stop="intercept"></i>
        </div>
      </div>
      <div class="tab-box">
        <div class="shop_tab">
          <div class="s-tab" v-for="(tab ,tindex) in categray_list.children.slice(1, categray_list.children.length)" :key="tindex" :class="{active:istrue == tindex}" @click="jumpTab(tindex, tab.obj.id)">
            <div class="con">{{tab.obj.name}}</div>
            <div :class="{botline:istrue == tindex}"></div>
          </div>
        </div>
        <div class="bread-box">
          <div class="bread" @click="goCateList">
            <span class="iconfont icon-download_ic_menu"></span>
          </div>
        </div>
      </div>
      <!-- 二级搜索栏 -->
      <div class="tab2-box">
        <div class="tab-cate tab-cate1" :class="select_second_list1 ? 'hight' : ''" @click="searchOverlayOne">
          <span class="fur-name">{{fur_name}}</span>
          <span class="iconfont icon-shoplist_down" v-if="font_color1"></span>
          <span class="iconfont icon-shoplist_up_sel" v-if="!font_color1"></span>
        </div>
        <div class="tab-cate" :class="auto_line ? 'hight hight2' : ''" @click="autoLine">
          智能排序
        </div>
        <div class="tab-cate" :class="font_color2 ? 'hight' : ''" @click="searchOverlayTwo">
          <span>价格</span>
          <img v-if="font_color2 === 0" src="../../../../../static/mobile/svg/shoplist_price01.svg" alt="">
          <img v-if="font_color2 === 1" src="../../../../../static/mobile/svg/shoplist_price02.svg" alt="">
          <img v-if="font_color2 === 2" src="../../../../../static/mobile/svg/shoplist_price03.svg" alt="">
        </div>
        <div class="icon-checkout-view" @click="checkoutView">
          <span v-show="checkout_view === 1" class="iconfont icon-shoplist_ic_showcaseh"></span>
          <span v-show="checkout_view === 2" class="iconfont icon-shoplist_ic_entryh"></span>
        </div>
      </div>
      <!-- 二级筛选列表 -->
      <div class="screen" v-show="second_search_state" @click="hiddenOverlayNow">
        <SecondSearchList @hiddenHight="hiddenHight" :second_type_list="second_type_list" @hiddenOverlay="hiddenOverlay"></SecondSearchList>
      </div>

      <div v-infinite-scroll="infinite"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <div v-if="list.length > 0">
          <ShopList2 v-show="checkout_view === 1" :shopList="list"></ShopList2>
          <SingleList v-show="checkout_view === 2" :shopList="list"></SingleList>
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
import SingleList from '../../../../components/mobile/business/SingleList';
import {LifeStyle, CommentNull, Loading} from '../../../../components/mobile/business';
import SearchPage from './SearchPage.vue';
import wechat from '../../../../mixins/wechat.js';
import SecondSearchList from './secondsearch/SecondSearchList';
export default {
  name: 'ShopList',
  mixins: [frequent, wechat],
  components: {
    Loading, LifeStyle, OpenApp, SearchPage, CommentNull, ShopList2, SecondSearchList, SingleList
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
      font_color2: 0,
      font_color_state1: false, // ETC 二级tab栏高亮
      select_second_list1: false, // ETC 是否选中二级选中列表项
      select_second_list2: false, // ETC 是否选中二级选中列表项
      fur_name: '全部商品', // ETC 家具栏
      second_type_list: [], // ETC 二级类目列表
      auto_line: false, // ETC 智能排序
      sort_id: 1, // ETC 价格排序默认
      categray_id: '', // ETC 暂存二级类目id
      together_id: '', // ETC 暂存综合排序id
      loadingJudge: false, // ETC 没有数据前的页面显示判断
      checkout_view: 1 // ETC 切换列表模式
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
      store.dispatch('pro_list/getLogo', {}),
      store.dispatch('pro_list/getHot')
    ]);
  },
  mounted() {
    if(window.sessionStorage.getItem('checkView')){
      this.checkout_view = +window.sessionStorage.getItem('checkView');
    }
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
      this.$store.dispatch('pro_list/getCategoryList');
      for (let i = 0; i < this.categray_list.children.length; i++) {
        if(this.$route.query && this.categray_list.children[i].obj.id === (this.$route.query.id * 1)){
          this.istrue = i - 1;
          this.proid = this.categray_list.children[i].obj.id;
          if(this.$route.query.second_id){
            for (let j = 0; j < this.categray_list.children[i].children.length; j++) {
              if(+this.categray_list.children[i].children[j].obj.id === +this.$route.query.second_id){
                this.select_second_list1 = true;
                this.fur_name = this.categray_list.children[i].children[j].obj.name;
                this.categray_id = this.$route.query.second_id ? this.$route.query.second_id : '';
              }
            }
          }
          return;
        }else{
          this.proid = this.categray_list.children[1].obj.id;
        }
      }
    }
  },
  destroyed() {
    this.$store.unregisterModule('pro_list', product_list);
  },
  methods: {
    // 切换列表样式
    checkoutView(){
      if(this.checkout_view === 1){
        this.checkout_view = 2;
      }else{
        this.checkout_view = 1;
      }
      window.sessionStorage.setItem('checkView', this.checkout_view);
    },
    // 智能排序
    autoLine(){
      this.auto_line = true;
      this.font_color1 = true;
      this.font_color2 = 0;
      this.sort_id = 1;
      this.$store.dispatch('pro_list/getProductList2', {id: this.categray_id ? this.categray_id : this.proid, sort_id: this.sort_id});
      this.second_search_state = false;
    },
    // 聚合
    aggregation(name){
      this.fur_name = name;
      this.font_color1 = !this.font_color1;
    },
    // 回复默认tab选项不高亮
    hiddenHight(name){
      this.second_search_state = false;
      this.select_second_list1 = false;
      this.categray_id = '';
      this.$store.dispatch('pro_list/getProductList2', {id: this.categray_id ? this.categray_id : this.proid, sort_id: this.sort_id});
      this.aggregation(name);
    },
    // 无选中隐藏整块弹层盒子
    hiddenOverlayNow(){
      this.second_search_state = false;
      this.font_color1 = true;
    },
    // 选中列表隐藏二级搜索列表
    hiddenOverlay(name, categray_id){
      this.categray_id = categray_id;
      this.select_second_list1 = true;
      this.$store.dispatch('pro_list/getProductList2', {id: this.categray_id ? this.categray_id : this.proid, sort_id: this.sort_id});
      
      this.second_search_state = false;
      this.aggregation(name);
    },
    // 二级筛选
    searchOverlayOne(){
      this.second_type_list = this.categray_list.children[this.istrue + 1];
      this.second_search_state = true;

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
      this.auto_line = false;
      this.second_search_state = true;
      this.font_color1 = true;

      this.font_color_state1 = false;
      if(this.font_color2 === 0){
        this.sort_id = 2;
        this.font_color2 = 1;
      }else if(this.font_color2 === 1){
        this.sort_id = 3;
        this.font_color2 = 2;
      }else if(this.font_color2 === 2){
        this.sort_id = 2;
        this.font_color2 = 1;
      }
      document.querySelector('.screen').style.opacity = 0;
      this.second_search_state = false;
      this.$store.dispatch('pro_list/getProductList2', {id: this.categray_id ? this.categray_id : this.proid, sort_id: this.sort_id});
    },
    // 回到商品列表
    fromSearch(){
      this.found = false;
    },
    infinite() {
      this.$store.dispatch('pro_list/getProductList', {id: this.categray_id ? this.categray_id : this.proid, sort_id: this.sort_id}).then(()=>{
        this.loadingJudge = true;
      });
    },
    // 重置
    clear(){
      this.auto_line = false;
      this.categray_id = '';
      this.together_id = '';
      this.sort_id = 1;
      this.select_second_list1 = false;
      this.select_second_list2 = false;
      this.font_color1 = true; // ETC 二级筛选字色
      this.font_color2 = 0;
      this.font_color_state1 = false;
      this.fur_name = '全部商品'; // ETC 家具栏
    },
    // tab 切换
    jumpTab(tindex, id){
      this.clear();
      this.second_search_state = false;
      
      this.istrue = tindex;
      this.proid = id;
      // this.$router.replace({name: 'ShopList', query: {id: this.proid}});
      history.pushState(null, null, `shop_list?id=${this.proid}`);
      this.$store.dispatch('pro_list/getProductList2', {id: this.categray_id ? this.categray_id : this.proid, sort_id: this.sort_id});
      // this.infinite();
      this.$store.dispatch('pro_list/tabChange', false);
    },
    searchUser(){
      this.found = true;
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
