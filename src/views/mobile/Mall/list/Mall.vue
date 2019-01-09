<template>
  <div class="mall">
    <!-- 搜索框 -->
    <div class="search" :class="{searching: search_popup}">
      <i class="iconfont icon-download_ic_menu"></i>
      <div class="input">
        <i class="iconfont icon-search_lb_searchCop"></i>
        <input type="search" v-model="keyword" @focus="activeSearch" @input="getSearchList" placeholder="搜索商品">
        <i v-show="search_popup && keyword" class="iconfont icon-delete_ic_grey_bg_" @click="keyword = ''"></i>
      </div>
      <i class="iconfont icon-detail_ic_shoppingba"></i>
      <span v-show="search_popup" @click="closeSearch">取消</span>
    </div>
    <template v-if="!search_popup">
      <!-- banner -->
      <div class="banner"></div>
      <!-- 热门商品 -->
      <div class="module">
        <div class="title">
          <h3>热门商品</h3>
          <i class="iconfont icon-shopping_next"></i>
        </div>
        <ul>
          <li v-for="(item, index) in []" :key="index">
            <single-good :item="item"></single-good>
          </li>
        </ul>
      </div>
      <!-- 年货合集 -->
      <!-- 情人节 -->
      <!-- 软装计划 -->
      <!-- 装饰画 -->
      <!-- 旅行达人 -->
      <!-- 更多推荐 -->
    </template>
    <mall-search v-if="search_popup" :keyword="keyword"></mall-search>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import mall from '../../../../store/mall/mall.js';
  import {warning} from '../../../../utils/business/tools.js';
  import {MallSearch} from '../../../../components/mobile/popup';
  import {SingleGood} from '../../../../components/mobile/business';

  export default {
    title() {
      return '商城';
    },
    meta() {
      return `<meta name="description" content="商城">
      <meta name="keywords" content="商城">`;
    },
    asyncData({store}) {
      store.registerModule('mall', mall);
    },
    components: {MallSearch, SingleGood},
    data() {
      return {
        keyword: '',
        search_popup: false
      };
    },
    mounted() {
      this.$store.registerModule('mall', mall, {preserveState: true});
    },
    methods: {
      // 激活搜索框
      activeSearch() {
        let that = this;
        that.search_popup = true;
        that.search();
        if(!that.hot_list.length) that.$store.dispatch('mall/getHotList');
      },
      closeSearch() {
        let that = this;
        that.search_popup = false;
        that.keyword = '';
      },
      // keyword关联列表
      getSearchList(e) {
        const keyword = e.target.value;
        if(keyword) this.$store.dispatch('mall/getSearchList', keyword);
      },
      // 点击搜索
      search() {
        let that = this;
        const searchBtn = that.$el.querySelector('.search [type=search]');
        searchBtn.addEventListener('keypress', (e) => {
          const keycode = e.keyCode;
          if (keycode === 13) {
            if (that.keyword === '') {
              warning('输入内容之后才可以搜索哦!', 2000);
            } else {
              that.$router.push({name: 'SearchContent', params: {id: null, key: that.keyword}});
            }
          }
        }, false);
      }
    },
    computed: mapState({
      hot_list: (store) => store.mall.hot_list
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .mall {
    .search {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 0.89rem;
      padding: 0 0.4rem;
      border-bottom: 0.01rem solid $borderColor;
      &.searching {
        position: fixed;
        top: 0;
        z-index: 3001;
        width: 6.9rem;
        padding: 0 0.3rem;
        >i {
          display: none;
        }
        .input {
          width: 6rem;
        }
      }
      .input {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        width: 5.38rem;
        height: 0.6rem;
        padding:0  0.2rem;
        border-radius: 0.3rem;
        background-color: #F1F2F3;
        i {
          width: 0.32rem;
          font-size: 0.32rem;
          color: #999;
          &:first-of-type {
            margin-right: 0.12rem;
          }
        }
        input {
          flex: 1;
          height: 0.4rem;
          padding: 0;
          font-size:0.3rem;
          border: none;
          background-color:#F1F2F3;
          &::-webkit-search-cancel-button{
            display: none;
          }
          &:placeholder {
            font-size: 0.28rem;
            color: #999;
          }
        }
      }
      i {
        &.icon-download_ic_menu {
          font-size: 0.46rem;
        }
        &.icon-detail_ic_shoppingba {
          font-size: 0.46rem;
        }
      }
    }
    .banner {
      height: 4.22rem;
      border-bottom: 0.01rem solid $borderColor;
    }
    .module {
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.3rem;
        padding: 0 0.3rem;
        h3 {
          font-size: 0.44rem;
          font-weight: 400;
          color: $themeColor;
        }
        i {
          font-size: 12px;
          color: rgba(106,106,106,1);
        }
      }
    }
  }
</style>
