<template>
  <div class="mall">
    <mall-search>
      <!-- banner -->
      <a :href="global_data.mall.banner[0].link" class="banner" v-if="global_data && global_data.mall && global_data.mall.banner && global_data.mall.banner.length">
        <img v-lazy="imageSize(global_data.mall.banner[0].img, '750x422')" alt="">
      </a>
      <!-- 猜你喜欢 -->
      <module-list v-if="mall_list.length && mall_list[0].data.length" class="module" :vitem="mall_list[0]"></module-list>
      <!-- 热门商品 -->
      <div class="hot">
        <module-list v-if="mall_list.length && mall_list[1].data.length" :vitem="mall_list[1]"></module-list>
        <div class="category" v-if="category.children && category.children.length">
          <span v-for="(item, index) in category.children.slice(0,7)" :key="index" @click="queryAssign('shop_list', {id: item.obj.id})">{{item.obj.name.slice(0,3)}}</span>
          <span v-if="category.children.length >= 7" @click="paramsSkip('ShopCategory')">更多</span>
        </div>
      </div>
      <!-- 人工榜单 -->
      <div class="manual" :class="{last: module_list.length === vindex + 1}" v-for="(vitem, vindex) in module_list" :key="vindex" v-if="module_list.length">
        <template v-if="vitem.module_type === 1">
          <a :href="vitem.link" class="imgs" v-if="vitem.imgs && vitem.imgs.length && vitem.link !== 'https://m.lanehub.cn/private_coupon_list'">
            <img v-lazy="imageSize(vitem.imgs[0], '690x388')" alt="">
          </a>
          <module-list v-if="!(vitem.imgs && vitem.imgs.length) && vitem.data.length" class="module" :vitem="vitem"></module-list>
        </template>
        <template v-if="vitem.module_type === 2">
          <a :href="vitem.img_link[0].link" class="imgs" v-if="vitem.img_link[0].link !== 'https://m.lanehub.cn/private_coupon_list'">
            <img v-lazy="imageSize(vitem.img_link[0].img, '690x388')" alt="">
          </a>
        </template>
      </div>
      <!-- 更多推荐 -->
      <div class="recommend list" v-if="recommend_list.length">
        <div class="title">
          <h3>更多推荐</h3>
        </div>
        <div class="shop-list"
          v-infinite-scroll="infinite"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
            <shop-list :shopList="recommend_list"></shop-list>
            <loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="false"></loading>
        </div>
      </div>
    </mall-search>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import mall from '../../../../store/mall/mall.js';
  import mall_search from '../../../../store/mall/mall_search.js';
  import frequent from '../../../../mixins/frequent.js';
  import imageSize from '../../../../utils/filters/imageSize.js';
  import {MallSearch} from '../../../../components/mobile/popup';
  import {ModuleList, ShopList, Loading} from '../../../../components/mobile/business';

  export default {
    title() {
      return '商城首页';
    },
    meta() {
      return `<meta name="description" content="商城首页">
      <meta name="keywords" content="商城首页">`;
    },
    asyncData({store}) {
      store.registerModule('mall', mall);
      store.registerModule('mall_search', mall_search);
      return Promise.all([
        store.dispatch('getGlobal'),
        store.dispatch('mall/getMallList'),
        store.dispatch('mall/getCategoryList'),
        store.dispatch('mall/getModuleManualList'),
        store.dispatch('mall/getModuleRecommend')
      ]);
    },
    components: {MallSearch, ModuleList, ShopList, Loading},
    mixins: [frequent],
    data() {
      return {
        imageSize
      };
    },
    mounted() {
      let that = this;
      that.$store.registerModule('mall', mall, {preserveState: true});
      that.$store.registerModule('mall_search', mall_search, {preserveState: true});
    },
    destroyed() {
      this.$store.unregisterModule('mall');
    },
    methods: {
      infinite(){
        this.$store.dispatch('mall/getModuleRecommend');
      }
    },
    computed: {
      ...mapState({
        global_data: (store) => store.global_data,
        mall_list: (store) => store.mall.mall_list,
        category: (store) => store.mall.category,
        module_list: (store) => store.mall.module_list,
        recommend_list: (store) => store.mall.recommend_list,
        loadInfo: (store) => store.mall.loadInfo
      }),
      loading() {
        return this.$store.state.mall.loadInfo.loading;
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .mall {
    .banner {
      display: flex;
      img {
        width: 100%;
        height: 4.22rem;
      }
    }
    .hot {
      position: relative;
      padding: 0.5rem 0;
      &::after {
        content: '';
        position: absolute;
        left: 0.3rem; bottom: 0;
        width: 6.9rem;
        height: 1px;
        background-color: $borderColor;
      }
      .category {
        overflow: hidden;
        padding: 0.6rem 0.3rem 0.1rem;
        span {
          float: left;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 1.5rem;
          height: 0.8rem;
          margin-right: 0.3rem;
          border-radius: 0.06rem;
          background-color: #f6f6f6;
          &:nth-child(4n) {
            margin-right: 0;
          }
          &:nth-child(5), &:nth-child(6), &:nth-child(7), &:nth-child(8) {
            margin-top: 0.36rem;
          }
        }
      }
    }
    .recommend {
      padding: 0.5rem 0 0;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.44rem;
        padding: 0 0.3rem 0.36rem;
        h3 {
          font-size: 0.44rem;
          font-weight: 400;
          color: $themeColor;
        }
      }
      >.shop-list {
        padding: 0 0.3rem;
      }
    }
    .imgs {
      display: flex;
      padding: 0.1rem 0.3rem;
      img {
        height: 3.88rem;
        border-radius: 0.1rem;
      }
    }
  }
</style>
<style lang="scss">
  .mall .mall-search {
    .search-input {
      .icon-nav_ic_return {
        display: none;
      }
    }
  }
</style>
