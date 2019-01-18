<template>
  <div class="categray">
    <div v-show="!found">
      <!-- <form action="#" id="search_form"> -->
        <div class="search">
          <div class="input-box">
            <i class="iconfont icon-nav_ic_return" style="font-size: 0.46rem; color: #222;" @click="goBack"></i>
            <div class="input">
              <i class="iconfont icon-search_lb_searchCop"></i>
              <input type="text" placeholder="搜索商品" @focus="searchUser">
            </div>
            <i class="iconfont icon-detail_ic_shoppingba" style="font-size: 0.46rem; color: #222; margin-left: 0.2rem;" @click.stop="intercept"></i>
          </div>
        </div>
      <!-- </form> -->
      <div class="categray-list">
        <div class="img" @click="goStore">
          <img src="" alt="">
        </div>
        <!-- {{categray_list}} -->
        <ul>
          <li v-for="(a, index) in categray_list.children" :key="index" @click="goShopList(a.obj.id)">{{a.obj.name}}</li>
        </ul>
      </div>
    </div>
    <div v-show="found">
      <SearchPage @fromSearch="fromSearch" @cancelSearch= "cancelSearch" :hotlist="hotlist" :history="history" :proid="proid"></SearchPage>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';

import frequent from '../../../../mixins/frequent';
import wechat from '../../../../mixins/wechat.js';

import product_list from '../../../../store/mall/product_list.js';
import SearchPage from './SearchPage.vue';
export default {
  name: 'shopCategray',
  components: {
    SearchPage
  },
  mixins: [frequent, wechat],
  data(){
    return {
      found: false,
      proid: 0
    };
  },
  title() {
    return '商城类目';
  },
  meta() {
    return `<meta name="description" content="商城类目">
    <meta name="keywords" content="商城类目">`;
  },
  asyncData({store}) {
    store.registerModule('cate_list', product_list);
    return Promise.all([
      store.dispatch('cate_list/getLogo', {}),
      store.dispatch('cate_list/getCategray')
    ]);
  },
  mounted(){
    this.$store.registerModule('cate_list', product_list, {preserveState: true});
    // 微信分享
    const link = window.location.href;
    const title = '瓴里商城';
    const desc = '一起创造愉悦的生活方式';
    const imgUrl = this.logo;
    this.wxInit(link, title, desc, imgUrl);
  },
  methods: {
    goBack(){
      this.$router.back();
    },
    searchUser(){
      this.found = true;
      this.$store.dispatch('cate_list/getHot');
      this.$store.dispatch('cate_list/getHistory');
    },
    goShopList(cate_id){
      this.$router.push({name: 'ShopList', query: {id: cate_id}});
    },
    // 去店铺默认首页
    goStore(){
      this.$router.push({name: 'StoreDetail', query: {store_id: 2}});
    },
    cancelSearch(){
      this.found = false;
    },
    // 回到商品列表
    fromSearch(){
      this.found = false;
    }
  },
  computed: {
    ...mapState({
      logo: (store) => store.cate_list.logo,
      hotlist: (store) => store.cate_list.hotlist,
      history: (store) => store.cate_list.history,
      categray_list: (store) => store.cate_list.categray_list
    })
  }
};
</script>
<style lang="scss" scoped>
@import '../../../../assets/scss/_base.scss';
.search{
  z-index: 1000;
  // width: 100%;
  position: fixed;
  top: 0;
  // left: 0;
  padding: 0.14rem 0.3rem;
  background-color: #fff;
  border-bottom: 0.01rem solid $borderColor;
  .input-box{
    width: 6.9rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .input {
    display: flex;
    align-items: center;
    width: 5.54rem;
    height: 0.6rem;
    padding-left: 0.2rem;
    border-radius: 0.3rem;
    background-color: #f1f2f3;
    i {
      margin-right: 0.1rem;
      font-size: 0.3rem;
      color: #999;
    }
    input {
      width: 4.87rem;
      // height: 0.6rem;
      // padding: 0.1rem 0;
      padding: 0.08rem 0;
      font-size:0.3rem;
      line-height: 0.3rem;
      box-sizing: border-box;
      outline: none;
      border: none;
      background-color:#f1f2f3;
      &::-webkit-input-placeholder {
        font-size: 0.28rem;
        font-weight: 300;
        line-height: 0.4rem;
        color: #888;
      }
      &:-moz-placeholder{
        font-size: 0.28rem;
        font-weight: 300;
        line-height: 0.4rem;
        color: #888;
      }
      &::-moz-placeholder{
        font-size: 0.28rem;
        font-weight: 300;
        line-height: 0.4rem;
        color: #888;
      }
      &:-ms-input-placeholder{
        font-size: 0.28rem;
        font-weight: 300;
        line-height: 0.4rem;
        color: #888;
      }
    }
  }
}
.categray-list{
  margin-top: 0.88rem;
  padding: 0.5rem;
  .img{
    width: 100%;
    height: 3.2rem;
    background-color: #FAFAFA;
    border-radius: 4px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  ul{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 0.1rem;
    li{
      margin-top: 0.5rem;
      width: 3rem;
      
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      height: 0.88rem;
      text-align: center;
      line-height: 0.88rem;
      background:#FAFAFA;
      border-radius:4px;
      border:0.01rem solid #B6B6B6;
    }
  }
}

</style>
