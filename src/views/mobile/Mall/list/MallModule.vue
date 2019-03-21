<template>
  <div class="mall-module">
    <public-title :pageTitle="page_title" v-if="!(response.__platform === 'app' || isTencent)"></public-title>
    <a class="banner" href="javascript:;">
      <img :src="module_type === 3 ? mall_module3 : module_type === 10 ? mall_module10 : mall_module2" alt="">
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
  import linsign from '../../../../utils/signFun.js';
  import wechat from '../../../../mixins/wechat.js';
  import hidetitle from '../../../../mixins/hidetitle.js';
  import UserActions from '../../../../utils/business/actions.js';
  import mall_module from '../../../../store/mall/mall_module.js';
  import mall_module2 from '../../../../../static/mobile/img/h5/mall_module2.jpg';
  import mall_module3 from '../../../../../static/mobile/img/h5/mall_module3.jpg';
  import mall_module10 from '../../../../../static/mobile/img/h5/mall_module10.jpg';
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
        mall_module2,
        mall_module3,
        mall_module10,
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
      if(that.module_type === 3) that.page_title = '新品首发';
      else if(that.module_type === 10) that.page_title = '优惠专区';
      else that.page_title = '热销商品';
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
      that.wxInit(link, title, desc);
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
          that.module_type = item.type;
          that.$store.dispatch('mall_module/resetData');
          that.$store.dispatch('mall_module/getMallModule', {type: that.current.type, with_head_buyshow: that.module_type !== 10 ? 1 : 0});
          const query = that.$route.query;
          query.module_type = item.type;
          window.history.replaceState(null, null, `${that.$route.path}?${linsign.urlConcat(that.$route.query)}`);
        }
        const tab = document.querySelector(`.mall-module .category-box .tab${item.type}`);
        const line = document.querySelector('.mall-module .line');
        line.style.width = tab.offsetWidth - 6 + 'px';
        line.style.transform = `translateX(${tab.offsetLeft}px)`;
        const category = that.$el.querySelector('.mall-module .category');
        category.scrollLeft = tab.offsetLeft - ((category.offsetWidth - tab.offsetWidth) / 2) + 15;

        UserActions().action('click', '207', that.$route.name, {
          leaderboard_id: item.type
        });
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
    background-color: #fff;
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
          transition: all 0.2s;
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
              margin: 0 3px;
              background-color: #0072DD;
            }
          }
        }
      }
    }
  }
</style>

