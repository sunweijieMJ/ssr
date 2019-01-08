<template>
  <div class="mall">
    <!-- 搜索框 -->
    <div class="search">
      <i class="iconfont icon-download_ic_menu"></i>
      <div class="input">
        <i class="iconfont icon-search_lb_searchCop"></i>
        <input type="text" placeholder="搜索商品">
      </div>
      <i class="iconfont icon-detail_ic_shoppingba"></i>
    </div>
    <!-- banner -->
    <div class="banner"></div>
    <!-- 热门商品 -->
    <div class="module">
      <div class="title">
        <h3>热门商品</h3>
        <i class="iconfont icon-shopping_next"></i>
      </div>
      <shop-list :list="list"></shop-list>
    </div>
    <!-- 年货合集 -->
    <!-- 情人节 -->
    <!-- 软装计划 -->
    <!-- 装饰画 -->
    <!-- 旅行达人 -->
    <!-- 更多推荐 -->
  </div>
</template>
<script>
  import {ShopList} from '../../../../components/mobile/business';

  export default {
    title() {
      return '商城';
    },
    meta() {
      return `<meta name="description" content="商城">
      <meta name="keywords" content="商城">`;
    },
    components: {ShopList},
    data() {
      return {
        list: []
      };
    }
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
      .input {
        display: flex;
        align-items: center;
        width: 5.38rem;
        height: 0.6rem;
        padding-left: 0.2rem;
        border-radius: 0.3rem;
        background-color: #F1F2F3;
        i {
          margin-right: 0.12rem;
          font-size: 0.32rem;
          color: #999;
        }
        input {
          height: 0.4rem;
          padding: 0;
          font-size:0.3rem;
          border: none;
          background-color:#F1F2F3;
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
