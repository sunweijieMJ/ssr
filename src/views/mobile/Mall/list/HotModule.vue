<template>
  <div class="hot-module">
    <public-title :pageTitle="'瓴里热门榜单'" v-if="!(response.__platform === 'app' || isTencent)"></public-title>
    <vue-swiper :images="['https://pic2.lanehub.cn/production/7467c39a2538cd0f722d5bc5e7a8244b.jpg?x-oss-process=style/m-00007']"></vue-swiper>
    <div class="content">
      <div class="category">
        <div class="category-box">
          <span v-for="(item, index) in category" :key="index" :class="{active: current.type === item.type}" @click="changeTab(item.type)">{{item.text}}</span>
          <i class="line"></i>
        </div>
      </div>
      <div v-infinite-scroll="infinite"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <hot-module-list :list="hot_module"></hot-module-list>
        <loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="false"></loading>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import hidetitle from '../../../../mixins/hidetitle.js';
  import hot_module from '../../../../store/mall/hot_module.js';
  import {VueSwiper} from '../../../../components/mobile/public';
  import {PublicTitle, HotModuleList, Loading} from '../../../../components/mobile/business';

  export default {
    title() {
      return '瓴里热门榜单';
    },
    meta() {
      return `<meta name="description" content="瓴里热门榜单">
      <meta name="keywords" content="瓴里热门榜单">`;
    },
    asyncData({store}) {
      store.registerModule('hot_module', hot_module);
    },
    components: {
      PublicTitle, VueSwiper, HotModuleList, Loading
    },
    mixins: [hidetitle],
    data() {
      return {
        category: [
          {
            text: '销量榜',
            type: 4
          },
          {
            text: '好评榜',
            type: 5
          },
          {
            text: '门店热销榜',
            type: 6
          },
          {
            text: '瓴里热度榜',
            type: 7
          },
          {
            text: '家具榜',
            type: 8
          },
          {
            text: '家居榜',
            type: 9
          }
        ],
        current: {
          text: '销量榜',
          type: 4
        }
      };
    },
    created() {
      let that = this;
      if(that.$route.query.module_id) {
        that.current = that.category[that.$route.query.module_id - 4];
      }
    },
    mounted() {
      let that = this;
      that.$nextTick(() => {
        this.changeTab(that.current.type);
      });
      that.$store.registerModule('hot_module', hot_module, {preserveState: true});
    },
    destroyed() {
      this.$store.unregisterModule('hot_module', hot_module);
    },
    methods: {
      infinite(){
        let that = this;
        that.$store.dispatch('hot_module/getHotModule', that.current.type);
      },
      changeTab(type) {
        let that = this;
        that.current = that.category[type - 4];
        that.$store.dispatch('hot_module/resetData');
        that.$store.dispatch('hot_module/getHotModule', that.current.type);
        window.history.replaceState(null, null, `${that.$route.path}?module_id=${type}`);
        const tabs = document.querySelectorAll('.hot-module .category-box span');
        const line = document.querySelector('.hot-module .line');
        line.style.width = tabs[type - 4].offsetWidth + 'px';
        line.style.transform = `translateX(${tabs[type - 4].offsetLeft}px)`;
        tabs[type - 4].scrollIntoView({block: 'center', behavior: 'smooth'});
        // if(that.current.type === type) return;
      }
    },
    computed: {
      ...mapState({
        hot_module: (store) => store.hot_module.hot_module,
        loadInfo: (store) => store.hot_module.loadInfo,
        loading: (store) => store.hot_module.loadInfo.loading
      })
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .hot-module {
    .content {
      .category {
        display: flex;
        padding: 0.3rem;
        white-space: nowrap;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        border-bottom: 0.01rem solid $borderColor;
        &::-webkit-scrollbar {
          height: 0;
        }
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
            transition: transform 0.3s;
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
</style>

