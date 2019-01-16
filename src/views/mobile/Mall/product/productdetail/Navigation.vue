<template>
  <div class="navigation" :class="{show: showNav}">
    <a href="javascript:;" v-for="(item, index) in nav" :key="index" :class="{active: index === current}" @click="activeNav(index)">{{item.text}}</a>
  </div>
</template>
<script>
  import {throttle, setTimer} from '../../../../../utils/business/tools.js';

  export default {
    data(){
      return {
        showNav: 0,
        nav: [],
        current: 0 // ETC 当前选中的导航
      };
    },
    mounted() {
      let that = this;
      setTimer(that.offsetCalc);
    },
    methods: {
      activeNav(index){
        let that = this;
        that.setScrollTop(that.nav[index].offset);
        setTimer(() => {
          that.current = index;
        });
      },
      // 计算dom偏移量
      offsetCalc(){
        let that = this;
        const navH = document.querySelector('.product-detail .navigation').offsetHeight;
        const goodsH = document.querySelector('.product-detail .goods-info');
        const showH = document.querySelector('.product-detail .dynamic-title');
        const detailH = document.querySelector('.product-detail .desc-title');
        const hotH = document.querySelector('.product-detail .hot-goods');
        if(goodsH) {
          that.nav.push({
            text: '商品',
            offset: goodsH.offsetTop - navH + 1
          });
        }
        if(showH) {
          that.nav.push({
            text: '体验秀',
            offset: showH.offsetTop - navH + 1
          });
        }
        if(detailH) {
          that.nav.push({
            text: '详情',
            offset: detailH.offsetTop - navH + 1
          });
        }
        if(hotH) {
          that.nav.push({
            text: '推荐',
            offset: hotH.offsetTop - navH + 1
          });
        }
        window.addEventListener('scroll', throttle(that.listenScroll.bind(null), 200), false);
      },
      // 设置scrollTop值(兼容)
      setScrollTop(scroll_top) {
        window.pageYOffset = scroll_top;
        document.documentElement.scrollTop = scroll_top;
        document.body.scrollTop = scroll_top;
      },
      listenScroll(){
        let that = this;
        // 计算当前滚动距离
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        scrollTop >= that.nav[0].offset ? that.showNav = 1 : that.showNav = 0;

        if(that.nav.length === 2) {
          if(scrollTop < that.nav[1].offset){
            that.current = 0;
          } else if(scrollTop >= that.nav[1].offset){
            that.current = 1;
          }
        } else if(that.nav.length === 3) {
          if(scrollTop < that.nav[1].offset){
            that.current = 0;
          } else if(scrollTop >= that.nav[1].offset && scrollTop < that.nav[2].offset){
            that.current = 1;
          } else if(scrollTop >= that.nav[2].offset){
            that.current = 2;
          }
        } else {
          if(scrollTop < that.nav[1].offset){
            that.current = 0;
          } else if(scrollTop >= that.nav[1].offset && scrollTop < that.nav[2].offset){
            that.current = 1;
          } else if(scrollTop >= that.nav[2].offset && scrollTop < that.nav[3].offset){
            that.current = 2;
          } else if(scrollTop >= that.nav[3].offset){
            that.current = 3;
          }
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .navigation{
    box-sizing: border-box;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 7.5rem;
    height: 0.87rem;
    z-index: 2000;
    transition: all 0.3s;
    background-color: #fff;
    border-bottom: 0.01rem solid $borderColor;
    opacity: 0;
    visibility: hidden;
    &.show {
      opacity: 1;
      visibility: visible;
    }
    a {
      box-sizing: border-box;
      height: 0.87rem;
      font-size: 0.3rem;
      line-height: 0.87rem;
      color: $subColor;
      &.active {
        border-bottom: 2px solid $themeColor;
        color: $themeColor;
      }
    }
  }
</style>
