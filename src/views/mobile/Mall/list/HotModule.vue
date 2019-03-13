<template>
  <div class="hot-module">
    <public-title :pageTitle="'瓴里热门榜单'"></public-title>
    <vue-swiper :images="['https://pic2.lanehub.cn/production/7467c39a2538cd0f722d5bc5e7a8244b.jpg?x-oss-process=style/m-00007']"></vue-swiper>
    <div class="content">
      <div class="category">
        <div class="category-box">
          <span v-for="(item, index) in category" :key="index" :class="{active: current === index}" @click="changeTab(index)">{{item}}</span>
          <i class="line"></i>
        </div>
      </div>
      <div v-infinite-scroll="infinite"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <hot-module-list :list="[1,2]"></hot-module-list>
        <loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="true"></loading>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
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
      return Promise.all([
        store.dispatch('hot_module/getCategoryList'),
        store.dispatch('hot_module/getHotModule')
      ]);
    },
    components: {
      PublicTitle, VueSwiper, HotModuleList, Loading
    },
    data() {
      return {
        category: ['销量榜', '好评榜', '门店热销榜', 'APP热销榜', '销量榜', '好评榜'],
        current: 0
      };
    },
    mounted() {
      let that = this;
      this.changeTab(0);
      that.$store.registerModule('hot_module', hot_module, {preserveState: true});
    },
    destroyed() {
      this.$store.unregisterModule('hot_module', hot_module);
    },
    methods: {
      infinite(){
        let that = this;
        that.$store.dispatch('hot_module/getHotModule');
      },
      changeTab(index) {
        this.current = index;
        const tabs = document.querySelectorAll('.hot-module .category-box span');
        const line = document.querySelector('.hot-module .line');
        line.style.width = tabs[index].offsetWidth + 'px';
        line.style.transform = `translateX(${tabs[index].offsetLeft}px)`;
        tabs[index].scrollIntoView({block: 'center', behavior: 'smooth'});
      }
    },
    computed: {
      ...mapState({
        categray_list: (store) => store.hot_module.categray_list,
        hot_module: (store) => store.hot_module.hot_module,
        loadInfo: (store) => store.hot_module.loadInfo
      }),
      loading() {
        return this.$store.state.hot_module.loadInfo.loading;
      }
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

