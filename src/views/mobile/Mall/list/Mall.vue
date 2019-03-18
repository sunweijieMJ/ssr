<template>
  <div class="mall lh-footer">
    <mall-search>
      <!-- banner -->
      <div class="mall-banner" v-if="global_data.mall">
        <vue-swiper :images="global_data.mall.banner.slice(0, 8)" :autoplay="true" :loop="true" @to-parent="listenIndex"></vue-swiper>
        <div v-if="global_data.mall.banner.length > 1" class="pagination">
          <span v-for="(val, i) in global_data.mall.banner.slice(0, 8)" :key="i" :class="{active: current_index === i}"></span>
        </div>
      </div>
      <!-- 分类 -->
      <div class="channel">
        <ul class="quality_desc">
          <li v-for="(item, index) in mall_channel.quality_desc" :key="index">
            <img v-lazy="item.icon" alt="">
            <span>{{item.desc}}</span>
          </li>
        </ul>
        <div class="category">
          <a v-for="(item, index) in mall_channel.channel" :key="index" :href="item.redirect_url">
            <img v-lazy="imageSize(item.image, '80x80')" alt="">
            <span>{{item.title}}</span>
          </a>
        </div>
        <div class="pattern">
          <a :href="item[0].href" v-for="(item, index) in mall_channel.scatters.pattern2" :key="index">
            <img v-lazy="imageSize(item[0].img_src, '690x0')" alt="">
          </a>
        </div>
      </div>
      <!-- 热门 | 新品 | 折扣-->
      <ul class="hot-module" v-if="mall_hot.length">
        <li v-for="(item, index) in mall_hot" :key="index">
          <auto-module :vitem="item"></auto-module>
          <div class="pattern" v-if="item.type === '2'">
            <a :href="item[0].href" v-for="(item, index) in mall_channel.scatters.pattern6" :key="index">
              <img v-lazy="imageSize(item[0].img_src, '690x0')" alt="">
            </a>
          </div>
          <div class="pattern" v-if="item.type === '10'">
            <a :href="item[0].href" v-for="(item, index) in mall_channel.scatters.pattern4" :key="index">
              <img v-lazy="imageSize(item[0].img_src, '690x0')" alt="">
            </a>
          </div>
        </li>
      </ul>
      <!-- 人工榜单 -->
      <div class="manual-module">
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
      </div>
      <!-- 猜你喜欢 -->
      <div class="recommend list" v-if="recommend_list.length">
        <div class="title">
          <h3>猜你喜欢</h3>
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
  import {AutoModule, ModuleList, ShopList, Loading} from '../../../../components/mobile/business';

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
        store.dispatch('mall/getMallHotModule'),
        store.dispatch('mall/getMallChannel'),
        store.dispatch('mall/getModuleManualList'),
        store.dispatch('mall/getModuleRecommend')
      ]);
    },
    components: {MallSearch, VueSwiper, AutoModule, ModuleList, ShopList, Loading},
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
          if(!listbox[i].nextElementSibling) continue;
          if(listbox[i].nextElementSibling.classList.contains('imgbox')) {
            listbox[i].classList.add('hidden');
          }
        }
        const moduleBox = this.$el.querySelector('.manual-module').children;
        if(moduleBox[moduleBox.length - 1].classList.contains('imgbox')) {
          moduleBox[moduleBox.length - 1].classList.add('last');
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
        mall_hot: (store) => store.mall.mall_hot,
        mall_channel: (store) => store.mall.mall_channel,
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
    background-color: $intervalColor;
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
    .hot-module {
      li {
        margin-bottom: 0.2rem;
        background-color: #fff;
        .pattern {
          display: flex;
          justify-content: space-between;
          margin: 0 0.3rem;
          padding: 0.4rem 0 0.34rem;
          flex-wrap: wrap;
          border-top: 0.01rem solid $borderColor;
          a {
            margin-bottom: 0.06rem;
            img {
              width: 3.4rem;
              height: 1.65rem;
              border-radius: 0.02rem;
            }
          }
        }
      }
    }
    .channel {
      padding: 0 0.3rem;
      margin-bottom: 0.2rem;
      background-color: #fff;
      .quality_desc {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.24rem 0.1rem 0;
        li {
          display: flex;
          align-items: center;
          img {
            width: 0.28rem;
            height: 0.28rem;
            border-radius: 50%;
          }
          span {
            margin-left: 0.06rem;
            font-size: 0.24rem;
            color: $themeColor;
          }
        }
      }
      .category {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: 0.5rem 0 0.4rem;
        a {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 0.47rem 0.2rem 0;
          &:nth-child(5n) {
            margin-right: 0;
          }
          img {
            width: 1rem;
            height: 1rem;
          }
          span {
            @include tofl(1rem);
            margin-top: 0.12rem;
            font-size: 0.26rem;
            line-height: 0.32rem;
            font-weight: 400;
            color: $themeColor;
          }
        }
      }
      .pattern {
        display: flex;
        justify-content: space-between;
        padding-bottom: 0.4rem;
        a {
          img {
            width: 3.4rem;
            height: 1.65rem;
            border-radius: 0.02rem;
          }
        }
      }
    }
    .manual-module {
      margin-bottom: 0.2rem;
      background-color: #fff;
      .imgbox {
        padding-top: 0.5rem;
        background-color: #fff;
        .imgs {
          display: flex;
          padding: 0 0.3rem;
          img {
            height: 3.88rem;
            border-radius: 0.1rem;
          }
        }
        &.last {
          padding-bottom: 0.5rem;
        }
      }
      .listbox + .imgbox {
        margin-top: 0.1rem;
      }
      .hidden {
        .module::after {
          position: static;
        }
        & + .imgbox {
          padding-top: 0;
        }
      }
    }
    .recommend {
      padding: 0.5rem 0 0;
      background-color: #fff;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.44rem;
        padding: 0 0.3rem 0.1rem;
        h3 {
          font-size: 0.44rem;
          font-weight: 400;
          color: $themeColor;
        }
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
