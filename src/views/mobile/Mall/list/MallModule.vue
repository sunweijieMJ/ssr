<template>
  <div class="mall-module">
    <public-title :pageTitle="page_title" v-if="!(response.__platform === 'app' || isTencent)"></public-title>
    <a class="banner" href="javascript:;">
      <img :src="'https://pic2.lanehub.cn/production/7467c39a2538cd0f722d5bc5e7a8244b.jpg?x-oss-process=style/m-00007' | imageSize('750x422')" alt="">
    </a>
    <div class="content">
      <div class="category-wrapper">
        <div class="category" v-if="module_type !== 3 && module_type !== 10">
          <div class="category-box">
            <span v-for="(item, index) in category" :key="index" :class="[{active: current.type === item.type}, `tab${item.type}`]" @click="changeTab(item)">{{item.text}}</span>
            <i class="line"></i>
          </div>
        </div>
      </div>
      <div v-infinite-scroll="infinite"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <shop-list v-if="module_type === 3" :shopList="mall_module"></shop-list>
        <mall-module-list v-else :list="mall_module"></mall-module-list>
        <loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="false"></loading>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import wechat from '../../../../mixins/wechat.js';
  import hidetitle from '../../../../mixins/hidetitle.js';
  import mall_module from '../../../../store/mall/mall_module.js';
  import {VueSwiper} from '../../../../components/mobile/public';
  import {PublicTitle, ShopList, MallModuleList, Loading} from '../../../../components/mobile/business';

  export default {
    title() {
      return `${this.page_title}`;
    },
    meta() {
      return `<meta name="description" content="${this.page_title}">
      <meta name="keywords" content="${this.page_title}">`;
    },
    asyncData({store}) {
      store.registerModule('mall_module', mall_module);
    },
    components: {
      PublicTitle, VueSwiper, ShopList, MallModuleList, Loading
    },
    mixins: [wechat, hidetitle],
    data() {
      return {
        module_type: +this.$route.query.module_type,
        page_title: '',
        category: {
          2: {
            text: '销量榜',
            type: 2
          },
          5: {
            text: '好评榜',
            type: 5
          },
          6: {
            text: '门店热销榜',
            type: 6
          },
          7: {
            text: '瓴里热度榜',
            type: 7
          },
          8: {
            text: '家具榜',
            type: 8
          },
          9: {
            text: '家居榜',
            type: 9
          }
        },
        current: {
          text: '销量榜',
          type: 2
        }
      };
    },
    created() {
      let that = this;
      if(that.module_type === 3) that.page_title = '瓴里新品专区';
      else if(that.module_type === 10) that.page_title = '瓴里优惠专区';
      else that.page_title = '瓴里热门榜单';
      that.current = that.category[that.module_type];
    },
    mounted() {
      let that = this;
      that.$nextTick(() => {
        if(that.module_type !== 3 && that.module_type !== 10) this.changeTab(that.current);
      });
      that.$store.registerModule('mall_module', mall_module, {preserveState: true});
      // 微信分享
      const link = window.location.href;
      const title = that.page_title;
      const desc = '愉悦生活新起点，有品位的你怎能错过';
      const imgUrl = '';
      that.wxInit(link, title, desc, imgUrl);
    },
    destroyed() {
      this.$store.unregisterModule('mall_module', mall_module);
    },
    methods: {
      infinite(){
        let that = this;
        that.$store.dispatch('mall_module/getMallModule', {type: that.module_type, with_head_buyshow: that.module_type !== 10 ? 1 : 0});
      },
      changeTab(item) {
        let that = this;
        if(that.current.type !== item.type) {
          that.current = item;
          that.$store.dispatch('mall_module/resetData');
          that.$store.dispatch('mall_module/getMallModule', {type: that.current.type, with_head_buyshow: that.module_type !== 10 ? 1 : 0});
          window.history.replaceState(null, null, `${that.$route.path}?module_type=${item.type}`);
        }
        const tab = document.querySelector(`.mall-module .category-box .tab${item.type}`);
        const line = document.querySelector('.mall-module .line');
        line.style.width = tab.offsetWidth + 'px';
        line.style.transform = `translateX(${tab.offsetLeft}px)`;
        const category = that.$el.querySelector('.mall-module .category');
        // tab.scrollIntoView({block: 'center', behavior: 'smooth'});
        category.scrollLeft = tab.offsetLeft - ((category.offsetWidth - tab.offsetWidth) / 2) + 15;
      }
    },
    computed: mapState({
      mall_module: (store) => store.mall_module.mall_module,
      loadInfo: (store) => store.mall_module.loadInfo,
      loading: (store) => store.mall_module.loadInfo.loading
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .mall-module {
    .banner {
      display: flex;
      img {
        width: 100%;
        height: 4.22rem;
      }
    }
    .content {
      .category-wrapper {
        overflow: hidden;
        border-bottom: 0.01rem solid $borderColor;
        .category {
          display: flex;
          padding: 0.3rem 0.3rem 0.6rem;
          margin-top: -0.3rem;
          transform: translateY(0.3rem);
          white-space: nowrap;
          overflow-x: auto;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          .category-box {
            position: relative;
            display: flex;
            span {
              margin-right: 0.9rem;
              font-size: 0.3rem;
              line-height: 1;
              color: $subColor;
              &:last-of-type {
                margin-right: 0.3rem;
              }
              &.active {
                font-weight: 400;
                color: #0072DD;
              }
            }
            i {
              transition: transform 0.2s;
              position: absolute;
              left: 0;
              bottom: -0.08rem;
              height: 0.03rem;
              background-color: #0072DD;
            }
          }
        }
      }
    }
  }
</style>

