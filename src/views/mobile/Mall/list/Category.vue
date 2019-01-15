<template>
  <div class="mall-category">
    <mall-search>
      <a :href="global_data.mall.category_banner[0].link" class="banner" v-if="global_data && global_data.mall && global_data.mall.category_banner && global_data.mall.category_banner.length">
        <img v-lazy="imageSize(global_data.mall.category_banner[0].img, '690x0')" alt="">
        <p>
          <span>到访体验店 发现更多惊喜</span>
          <i class="iconfont icon-shopping_next"></i>
        </p>
      </a>
      <ul class="category">
        <li v-for="(item, index) in category.children" :key="index" @click="queryAssign('shop_list', {id: item.obj.id})">{{item.obj.name.slice(0,3)}}</li>
      </ul>
    </mall-search>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import frequent from '../../../../mixins/frequent.js';
  import imageSize from '../../../../utils/filters/imageSize.js';
  import mall_search from '../../../../store/mall/mall_search.js';
  import mall_category from '../../../../store/mall/mall_category.js';
  import MallSearch from '../../../../components/mobile/popup/MallSearch.vue';

  export default {
    title() {
      return '商城类目';
    },
    meta() {
      return `<meta name="description" content="商城类目">
      <meta name="keywords" content="商城类目">`;
    },
    asyncData({store}) {
      store.registerModule('mall_search', mall_search);
      store.registerModule('mall_category', mall_category);
      return Promise.all([
        store.dispatch('getGlobal'),
        store.dispatch('mall_category/getCategoryList')
      ]);
    },
    components: {MallSearch},
    mixins: [frequent],
    data() {
      return {
        imageSize
      };
    },
    mounted() {
      let that = this;
      that.$store.registerModule('mall_search', mall_search, {preserveState: true});
      that.$store.registerModule('mall_category', mall_category, {preserveState: true});
    },
    destroyed() {
      this.$store.unregisterModule('mall_category');
    },
    computed: mapState({
      global_data: (store) => store.global_data,
      category: (store) => store.mall_category.category
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .mall-category {
    background-color: #fff;
    .banner {
      position: relative;
      display: flex;
      margin: 0.5rem;
      img {
        width: 100%;
        height: 3.2rem;
      }
      p {
        position: absolute;
        bottom: 0;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 0.67rem;
        padding: 0 0.24rem;
        opacity: 0.8;
        background: linear-gradient(180deg,rgba(0,0,0,0.94) 0%,rgba(0,0,0,0.71) 100%);
        span {
          font-size: 0.3rem;
          font-weight: 400;
          color: #fff;
        }
        i {
          font-size: 12px;
          color: #fff;
        }
      }
    }
    .category {
      display: flex;
      flex-wrap: wrap;
      padding: 0.1rem 0.5rem;
      justify-content: space-between;
      li {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3rem;
        height: 0.88rem;
        margin-bottom: 0.5rem;
        @include thin-line(#b6b6b6, 4px);
        font-size: 0.34rem;
        font-weight: 400;
        color: $themeColor;
      }
    }
  }
</style>
<style lang="scss">
  .mall-category .mall-search {
    .search-input {
      .input {
        width: 5.54rem !important;
      }
      .icon-download_ic_menu {
        display: none;
      }
    }
  }
</style>
