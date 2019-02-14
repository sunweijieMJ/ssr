<template>
  <div class="mall lh-footer">
    <mall-search>
      <div class="mall-banner">
        <vue-swiper :images="global_data.mall.banner.slice(0, 8)" :autoplay="true" @to-parent="listenIndex"></vue-swiper>
        <div v-if="global_data.mall.banner.length > 1" class="pagination">
          <span v-for="(val, i) in global_data.mall.banner.slice(0, 8)" :key="i" :class="{active: current_index === i}"></span>
        </div>
      </div>
      <!-- banner -->
      <!-- <a :href="global_data.mall.banner[0].link" class="banner" v-if="global_data && global_data.mall && global_data.mall.banner && global_data.mall.banner.length">
        <img v-lazy="imageSize(global_data.mall.banner[0].img, '750x422')" alt="">
      </a> -->
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
      <div :class="vitem.module_type === 2 || vitem.imgs && vitem.imgs.length ? 'imgbox' : 'listbox'"
        v-for="(vitem, vindex) in module_list" :key="vindex" v-if="module_list.length" @click="skip(vitem)">
        <template v-if="vitem.module_type === 1">
          <div class="imgs" v-if="vitem.imgs && vitem.imgs.length && vitem.link !== 'https://m.lanehub.cn/private_coupon_list'">
            <img v-lazy="imageSize(vitem.imgs[0], '690x388')" alt="">
          </div>
          <module-list v-if="!(vitem.imgs && vitem.imgs.length) && vitem.data.length" class="module" :vitem="vitem"></module-list>
        </template>
        <template v-if="vitem.module_type === 2">
          <div class="imgs" v-if="vitem.img_link[0].link !== 'https://m.lanehub.cn/private_coupon_list'">
            <img v-lazy="imageSize(vitem.img_link[0].img, '690x388')" alt="">
          </div>
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
  import {VueSwiper} from '../../../../components/mobile/public';
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
    components: {MallSearch, VueSwiper, ModuleList, ShopList, Loading},
    mixins: [frequent],
    data() {
      return {
        imageSize,
        current_index: 0
      };
    },
    mounted() {
      let that = this;
      that.$store.registerModule('mall', mall, {preserveState: true});
      that.$store.registerModule('mall_search', mall_search, {preserveState: true});
      that.$nextTick(() => {
        const listbox = this.$el.querySelectorAll('.listbox');
        for(let i = 0, LEN = listbox.length; i < LEN; i++) {
          if(listbox[i].nextElementSibling.classList.contains('imgbox')) {
            listbox[i].classList.add('hidden');
          }
        }
        const imgbox = this.$el.querySelectorAll('.imgbox');
        for(let i = imgbox.length - 1; i >= 0; i--) {
          const classList = imgbox[i].nextElementSibling.classList;
          if(classList.contains('search-content')) {
            imgbox[i].classList.add('last');
          }
        }
      });
    },
    destroyed() {
      this.$store.unregisterModule('mall');
    },
    methods: {
      // swiper回调函数
      listenIndex(data){
        this.current_index = data;
      },
      infinite(){
        this.$store.dispatch('mall/getModuleRecommend');
      },
      skip(vitem) {
        let that = this;
        if(vitem.link) {
          window.location.href = vitem.link;
        } else {
          that.queryAssign('product/artificial', {module_id: vitem.id});
        }
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
    background-color: #fff;
    .mall-banner {
      display: flex;
      position: relative;
      img {
        width: 100%;
        height: 4.22rem;
      }
      .pagination {
        display: flex;
        justify-content: center;
        position: absolute;
        left: 0;right: 0;
        bottom: 0.24rem;
        span {
          display: inline-flex;
          width: 0.12rem;
          height:0.12rem;
          margin-right: 0.12rem;
          border-radius: 50%;
          background-color: rgba(239,239,239, 0.6);
          border: 0.01rem solid rgba(220,220,220,1);
          &:last-child {
            margin-right: 0;
          }
          &.active {
            background-color: rgba(0,122,255,1);
            border: 0.01rem solid rgba(235,235,235,1);
          }
        }
      }
    }
    .hot {
      position: relative;
      padding: 0.5rem 0;
      &:after{
        content: '';
        position: absolute;
        top: 0; left: 0.3rem;
        box-sizing: border-box;
        width: 13.8rem;
        height: 200%;
        transform: scale(0.5);
        transform-origin: left top;
        border-bottom: 1px solid $borderColor;
        pointer-events: none;
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
          font-size: 0.32rem;
          color: $themeColor;
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
    .imgbox {
      margin-top: 0.5rem;
      .imgs {
        display: flex;
        padding: 0 0.3rem;
        img {
          height: 3.88rem;
          border-radius: 0.1rem;
        }
      }
      &.last {
        margin-bottom: 0.5rem;
      }
    }

    .listbox + .imgbox {
      margin-top: 0.1rem;
    }
    .imgbox + .listbox, .recommend {
      margin-top: 0.1rem;
    }
    .hidden {
      .module::after {
        position: static;
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
