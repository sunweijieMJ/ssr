<template>
  <div class="mall-search">
    <!-- 搜索框 -->
    <div class="search-input" :class="{searching: search_popup}">
      <i class="iconfont icon-download_ic_menu" @click="paramsSkip('ShopCategory')"></i>
      <i class="iconfont icon-nav_ic_return" @click="back"></i>
      <div class="input">
        <i class="iconfont icon-search_lb_searchCop"></i>
        <form action="" @submit.prevent="submit">
          <input type="search" v-model="keyword" @focus="activeSearch" @input="getSearchList" placeholder="搜索商品" autocomplete="off">
        </form>
        <i v-show="search_popup && keyword" class="iconfont icon-delete_ic_grey_bg_" @click="keyword = ''"></i>
      </div>
      <i class="iconfont icon-detail_ic_shoppingba" @click="intercept"></i>
      <span v-show="search_popup" @click="closeSearch">取消</span>
    </div>
    <slot v-if="!search_popup"></slot>
    <div class="search-content" v-show="search_popup">
      <!-- 热门搜索 -->
      <div class="hot" v-show="!keyword">
        <h4>热门搜索</h4>
        <p>
          <span v-for="(item, index) in hot_list" :key="index" @click="paramsSkip('SearchContent', {id: null, key: item.text})">{{item.text}}</span>
        </p>
      </div>
      <!-- 联想list -->
      <ul class="list" v-show="keyword">
        <li v-for="(item, index) in search_list" :key="index" @click="paramsSkip('SearchContent', {id: null, key: item.text})">{{item.text}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import frequent from '../../../mixins/frequent.js';
  import {warning} from '../../../utils/business/tools.js';

  export default {
    mixins: [frequent],
    data() {
      return {
        keyword: '',
        search_popup: false
      };
    },
    methods: {
      // 激活搜索框
      activeSearch() {
        let that = this;
        that.search_popup = true;
        if(!that.hot_list.length) that.$store.dispatch('mall_search/getHotList');
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
        if(keyword) this.$store.dispatch('mall_search/getSearchList', keyword);
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
      hot_list: (store) => store.mall_search.hot_list,
      search_list: (store) => store.mall_search.search_list
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .mall-search {
    .search-input {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 0.89rem;
      padding: 0 0.4rem;
      background-color: #fff;
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
          color: $themeColor;
        }
        &.icon-nav_ic_return {
          font-size: 0.46rem;
        }
        &.icon-detail_ic_shoppingba {
          font-size: 0.46rem;
        }
      }
    }
    .search-content {
      padding-top: 0.9rem;
      .hot {
        padding: 0 0.3rem;
        h4 {
          margin: 0.3rem 0;
          font-size: 0.28rem;
          font-weight: 300;
          line-height: 0.28rem;
          color: $themeColor;
        }
        p {
          display: flex;
          flex-wrap: wrap;
          span {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            margin: 0 0.3rem 0.3rem 0;
            padding: 0.13rem 0.18rem;
            border-radius: 0.04rem;
            background-color: $intervalColor;
            font-size: 0.32rem;
            color: $themeColor;
          }
        }
      }
      .list {
        li {
          height: 0.88rem;
          padding: 0 0.3rem;
          @include tofl(6.9rem);
          border-bottom: 0.01rem solid $borderColor;
          font-size: 0.28rem;
          line-height: 0.88rem;
          color: $themeColor;
        }
      }
    }
  }
</style>

