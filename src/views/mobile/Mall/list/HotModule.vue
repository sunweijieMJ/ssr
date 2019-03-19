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
      <hot-module-list :list="3"></hot-module-list>
    </div>
  </div>
</template>
<script>
  import {VueSwiper} from '../../../../components/mobile/public';
  import {PublicTitle, HotModuleList} from '../../../../components/mobile/business';

  export default {
    title() {
      return '瓴里热门榜单';
    },
    meta() {
      return `<meta name="description" content="瓴里热门榜单">
      <meta name="keywords" content="瓴里热门榜单">`;
    },
    components: {
      PublicTitle, VueSwiper, HotModuleList
    },
    data() {
      return {
        category: ['销量榜', '好评榜', '门店热销榜', 'APP热销榜', '销量榜', '好评榜'],
        current: 0
      };
    },
    methods: {
      changeTab(index) {
        this.current = index;
        const tabs = document.querySelectorAll('.hot-module .category-box span');
        const line = document.querySelector('.hot-module .line');
        line.style.width = tabs[index].offsetWidth + 'px';
        line.style.transform = `translateX(${tabs[index].offsetLeft}px)`;
        tabs[index].scrollIntoView({block: 'center', behavior: 'smooth'});
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
        &::-webkit-scrollbar {
          height: 0;
        }
        .category-box {
          position: relative;
          display: flex;
          span {
            margin-right: 0.9rem;
            font-size: 0.3rem;
            font-weight: 400;
            line-height: 1;
            color: #0072DD;
            &:last-of-type {
              margin-right: 0.3rem;
            }
          }
          i {
            transition: transform 0.3s;
            position: absolute;
            left: 0;
            bottom: -0.08rem;
            height: 1px;
            background-color: #0072DD;
          }
        }
      }
    }
  }
</style>

