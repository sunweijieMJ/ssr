<template>
  <div class="mall-category">
    <mall-search>
      <div class="banner">
        <img v-lazy="'https://pic2.lanehub.cn/production/034c665ddf3e9ee425e85cca3b3ee7a4.jpg?x-oss-process=style/m-00013'" alt="">
      </div>
      <ul class="category">
        <li v-for="(item, index) in category.children" :key="index" @click="queryAssign('shop_list', {id: item.obj.id})">{{item.obj.name.slice(0,2)}}</li>
      </ul>
    </mall-search>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import frequent from '../../../../mixins/frequent.js';
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
        store.dispatch('mall_category/getCategoryList')
      ]);
    },
    components: {MallSearch},
    mixins: [frequent],
    mounted() {
      let that = this;
      that.$store.registerModule('mall_search', mall_search, {preserveState: true});
      that.$store.registerModule('mall_category', mall_category, {preserveState: true});
    },
    destroyed() {
      this.$store.unregisterModule('mall_category');
    },
    computed: mapState({
      category: (store) => store.mall_category.category
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .mall-category {
    background-color: #fff;
    .banner {
      padding: 0.5rem;
      img {
        width: 100%;
        height: 3.2rem;
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
