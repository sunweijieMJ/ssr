<template>
  <div class="mall">
    <mall-search>
      <!-- banner -->
      <div class="banner">
        <img v-lazy="'https://pic2.lanehub.cn/production/034c665ddf3e9ee425e85cca3b3ee7a4.jpg?x-oss-process=style/m-00013'" alt="">
      </div>
      <!-- 猜你喜欢 -->
      <div class="list module" v-if="mall_list && mall_list[0] && mall_list[0].data.length">
        <div class="title">
          <h3>{{mall_list[0].title}}</h3>
          <i class="iconfont icon-shopping_next"></i>
        </div>
        <ul class="content">
          <li v-for="(item, index) in mall_list[0].data" :key="index">
            <single-good :item="item"></single-good>
          </li>
        </ul>
      </div>
      <!-- 热门商品 -->
      <div class="hot">
        <div class="list" v-if="mall_list && mall_list[1] && mall_list[1].data.length">
          <div class="title">
            <h3>{{mall_list[1].title}}</h3>
            <i class="iconfont icon-shopping_next"></i>
          </div>
          <ul class="content">
            <li v-for="(item, index) in mall_list[1].data" :key="index">
              <single-good :item="item"></single-good>
            </li>
          </ul>
        </div>
        <div class="category" v-if="category.children && category.children.length">
          <span v-for="(item, index) in category.children.slice(0,7)" :key="index" @click="queryAssign('shop_list', {id: item.obj.id})">{{item.obj.name.slice(0,3)}}</span>
          <span v-if="category.children.length >= 7" @click="paramsSkip('ShopCategory')">更多</span>
        </div>
      </div>
      <!-- 人工榜单 -->
      <div class="module" v-for="(vitem, vindex) in module_list" :key="vindex" v-if="module_list.length">
        <div class="list" v-if="vitem.module_type === 1">
          <div class="imgs" v-if="vitem.imgs && vitem.imgs.length">
            <img v-lazy="imageSize(vitem.imgs[0], '690x0')" alt="">
          </div>
          <template v-else>
            <div class="title">
              <h3>{{vitem.title}}</h3>
              <i class="iconfont icon-shopping_next"></i>
            </div>
            <ul class="content">
              <li v-for="(item, index) in vitem.data" :key="index">
                <single-good :item="item"></single-good>
              </li>
            </ul>
          </template>
        </div>
        <div class="imgs" v-if="vitem.module_type === 2">
          <img v-lazy="imageSize(vitem.img_link[0].img, '690x0')" alt="">
        </div>
      </div>
      <!-- 更多推荐 -->
      <div class="recommend list" v-if="recommend_list.length">
        <div class="title">
          <h3>更多推荐</h3>
          <i class="iconfont icon-shopping_next"></i>
        </div>
        <div class="shop-list">
          <shop-list :shopList="recommend_list"></shop-list>
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
  import {SingleGood, ShopList} from '../../../../components/mobile/business';

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
        store.dispatch('mall/getMallList'),
        store.dispatch('mall/getCategoryList'),
        store.dispatch('mall/getModuleManualList'),
        store.dispatch('mall/getModuleRecommend')
      ]);
    },
    components: {MallSearch, SingleGood, ShopList},
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
    computed: mapState({
      mall_list: (store) => store.mall.mall_list,
      category: (store) => store.mall.category,
      module_list: (store) => store.mall.module_list,
      recommend_list: (store) => store.mall.recommend_list
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .mall {
    .banner {
      img {
        height: 4.22rem;
      }
      border-bottom: 0.01rem solid $borderColor;
    }
    .hot {
      .list {
        margin-bottom: 0.6rem;
      }
      .category {
        overflow: hidden;
        padding: 0 0.3rem;
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
    .module {
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
      &:last-of-type::after {
        position: static;
      }
    }
    .recommend {
      padding-bottom: 0;
    }
    .list {
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.44rem;
        padding: 0 0.3rem;
        margin: 0.5rem 0 0.36rem;
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
    .imgs {
      padding: 0 0.3rem;
      img {
        width: 100%;
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
