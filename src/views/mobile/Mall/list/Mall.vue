<template>
  <div class="mall">
    <!-- 搜索框 -->
    <div class="search" :class="{searching: search_popup}">
      <i class="iconfont icon-download_ic_menu"></i>
      <div class="input">
        <i class="iconfont icon-search_lb_searchCop"></i>
        <form action="" @submit.prevent="submit">
          <input type="search" v-model="keyword" @focus="activeSearch" @input="getSearchList" placeholder="搜索商品" autocomplete="off">
        </form>
        <i v-show="search_popup && keyword" class="iconfont icon-delete_ic_grey_bg_" @click="keyword = ''"></i>
      </div>
      <i class="iconfont icon-detail_ic_shoppingba"></i>
      <span v-show="search_popup" @click="closeSearch">取消</span>
    </div>
    <template v-if="!search_popup">
      <!-- banner -->
      <div class="banner">
        <img src="https://pic2.lanehub.cn/production/034c665ddf3e9ee425e85cca3b3ee7a4.jpg?x-oss-process=style/m-00013" alt="">
      </div>
      <div class="module">
        <!-- 热门商品 -->
        <div class="list">
          <div class="title">
            <h3>热门商品</h3>
            <i class="iconfont icon-shopping_next"></i>
          </div>
          <ul class="content">
            <li v-for="(item, index) in hot_goods" :key="index">
              <single-good :item="item"></single-good>
            </li>
          </ul>
        </div>
        <!-- 类目 -->
        <div class="category">
          <span v-for="(item, index) in category" :key="index" :class="{bottom: index > 3}">{{item}}</span>
        </div>
        <!-- 年货合集 -->
        <div class="list">
          <div class="title">
            <h3>年货合集 | 辞旧迎新 好礼添置</h3>
            <i class="iconfont icon-shopping_next"></i>
          </div>
          <ul class="content">
            <li v-for="(item, index) in hot_goods" :key="index">
              <single-good :item="item"></single-good>
            </li>
          </ul>
        </div>
      </div>
      <div class="module">
        <!-- 情人节 -->
        <div class="list">
          <div class="title">
            <h3>情人节 | 让礼物寄托爱意</h3>
            <i class="iconfont icon-shopping_next"></i>
          </div>
          <ul class="content">
            <li v-for="(item, index) in hot_goods" :key="index">
              <single-good :item="item"></single-good>
            </li>
          </ul>
        </div>
      </div>
      <div class="module">
        <!-- 软装计划 -->
        <div class="list">
          <div class="title">
            <h3>软装计划 | 经典简约的家具搭配</h3>
            <i class="iconfont icon-shopping_next"></i>
          </div>
          <ul class="content">
            <li v-for="(item, index) in hot_goods" :key="index">
              <single-good :item="item"></single-good>
            </li>
          </ul>
        </div>
        <!-- banner -->
        <div class="adver">
          <img src="https://pic2.lanehub.cn/production/5ce43e81902ad189d5925215f25435c1.jpg?x-oss-process=style/m-00013" alt="">
        </div>
        <!-- 装饰画 -->
        <div class="list">
          <div class="title">
            <h3>装饰画 | 用色彩点亮你的家</h3>
            <i class="iconfont icon-shopping_next"></i>
          </div>
          <ul class="content">
            <li v-for="(item, index) in hot_goods" :key="index">
              <single-good :item="item"></single-good>
            </li>
          </ul>
        </div>
      </div>
      <div class="module">
        <!-- 旅行达人 -->
        <div class="list">
          <div class="title">
            <h3>旅行达人必备清单</h3>
            <i class="iconfont icon-shopping_next"></i>
          </div>
          <ul class="content">
            <li v-for="(item, index) in hot_goods" :key="index">
              <single-good :item="item"></single-good>
            </li>
          </ul>
        </div>
      </div>
      <!-- 更多推荐 -->
      <div class="recommend list">
        <div class="title">
          <h3>更多推荐</h3>
          <i class="iconfont icon-shopping_next"></i>
        </div>
        <div class="shop-list">
          <shop-list :shopList="hot_goods"></shop-list>
        </div>
      </div>
    </template>
    <mall-search v-if="search_popup" :keyword="keyword"></mall-search>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import mall from '../../../../store/mall/mall.js';
  import {warning} from '../../../../utils/business/tools.js';
  import {MallSearch} from '../../../../components/mobile/popup';
  import {SingleGood, ShopList} from '../../../../components/mobile/business';

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
      return Promise.all([store.dispatch('mall/getHotGoods')]);
    },
    components: {MallSearch, SingleGood, ShopList},
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
        if(!that.hot_list.length) that.$store.dispatch('mall/getHotList');
      },
      // 关闭搜索框
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
      submit() {
        let that = this;
        if (that.keyword === '') {
          warning('输入内容之后才可以搜索哦!', 2000);
        } else {
          that.$router.push({name: 'SearchContent', params: {id: null, key: that.keyword}});
        }
      }
    },
    computed: mapState({
      hot_goods: (store) => store.mall.hot_goods,
      category: (store) => store.mall.category,
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
        form {
          flex: 1;
          display: flex;
        }
        input {
          flex: 1;
          height: 0.4rem;
          padding: 0;
          font-size:0.3rem;
          border: none;
          background-color:#F1F2F3;
          // 去除ios下input椭圆形/隐藏x
          -webkit-appearance: none;
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
      img {
        height: 4.22rem;
      }
      border-bottom: 0.01rem solid $borderColor;
    }
    .list {
      padding: 0.5rem 0;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.44rem;
        padding: 0 0.3rem;
        margin-bottom: 0.36rem;
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
      .content {
        display: flex;
        padding: 0 0.3rem;
        overflow-x: auto;
        overflow-y: hidden;
        &::-webkit-scrollbar {
          display:none;
        }
        -webkit-overflow-scrolling: touch;
        li {
          margin-right: 0.2rem;
          &:last-child {
            padding-right: 0.3rem;
          }
        }
      }
      >.shop-list {
        padding: 0 0.3rem;
      }
    }
    .module {
      position: relative;
      &::after {
        content: '';
        position: absolute;
        left: 0.3rem; bottom: 0;
        width: 6.9rem;
        height: 1px;
        background-color: $borderColor;
      }
      .adver {
        padding: 0.1rem 0.3rem;
        img {
          height: 3.88rem;
          border-radius: 0.1rem;
        }
      }
    }
    .category {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 0.1rem 0.3rem;
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.5rem;
        height: 0.8rem;
        margin-bottom: 0.36rem;
        border-radius: 0.06rem;
        background-color: #f6f6f6;
        &.bottom {
          margin-bottom: 0;
        }
      }
    }
    .recommend {
      padding-bottom: 0;
    }
  }
</style>
