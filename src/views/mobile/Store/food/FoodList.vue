<template>
  <div class="food-list">
    <life-style :type="2"></life-style>
    <main class="menu-view">
      <nav-list :current="current" :setScrollTop="setScrollTop"></nav-list>
      <menu-list></menu-list>
    </main>
    <order-btn ref="btn"></order-btn>
    <food-popup></food-popup>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import wechat from '../../../../mixins/wechat.js';
  import food_list from '../../../../store/store/food_list.js';
  import {throttle} from '../../../../utils/business/tools.js';
  import {LifeStyle} from '../../../../components/mobile/business';
  import {NavList, MenuList, OrderBtn, FoodPopup} from './foodlist/index.js';

  export default {
    components: {
      LifeStyle, NavList, MenuList, OrderBtn, FoodPopup
    },
    title() {
      return '咖啡吧';
    },
    meta() {
      return `<meta name="description" content="咖啡吧">
              <meta name="keywords" content="咖啡吧">`;
    },
    asyncData({store, route}) {
      store.registerModule('food_list', food_list);
      const id = route.query.store_id;
      return Promise.all([store.dispatch('food_list/getFoodList', id)]);
    },
    mixins: [wechat],
    data() {
      return {
        nav: [],
        current: 0
      };
    },
    mounted() {
      let that = this;
      that.$store.registerModule('food_list', food_list, {preserveState: true});
      that.offsetCalc();

      // 微信分享
      if(!that.food_list.length) return;
      const link = window.location.href;
      const title = '咖啡吧';
      const desc = '瓴里体验店';
      const imgUrl = that.food_list[0].products[0].basic.list_headimg;
      that.wxInit(link, title, desc, imgUrl);
    },
    methods: {
      // 计算食品栏偏移量
      offsetCalc(){
        let that = this;
        const title = document.querySelector('.life-style').offsetHeight;
        for(let i = 0, LEN = that.$el.querySelectorAll('h4').length; i < LEN; i++) {
          that.nav.push({
            name: that.food_list[i].category_name,
            offset: that.$el.querySelectorAll('h4')[i].offsetTop - title
          });
        }
        that.$el.querySelector('.menu-list').addEventListener('scroll', throttle(that.listenScroll.bind(null), 60), false);
      },
      // 设置scrollTop值
      setScrollTop(index) {
        let that = this;
        that.current = index;
        that.$el.querySelector('.menu-list').scrollTop = that.nav[index].offset;
      },
      // 监听右侧食品栏
      listenScroll(){
        let that = this;
        // 计算当前滚动距离
        const scrollTop = that.$el.querySelector('.menu-list').scrollTop;
        for(let i = 0, LEN = that.nav.length; i < LEN; i++) {
          if(scrollTop >= that.nav[LEN - 1].offset) {
            that.current = LEN - 1;
          } else if(scrollTop >= that.nav[i].offset && scrollTop < that.nav[i + 1].offset) {
            that.current = i;
          }
        }
      }
    },
    computed: mapState({
      food_list: (store) => store.food_list.food_list
    })
  };
</script>
<style lang="scss" scoped>
  .food-list {
    width: 100%;
  }
  .menu-view {
    display: flex;
    height: calc(100vh - 2.08rem);
    .nav-list {
      width: 1.9rem;
      background-color: #f7f7f7;
    }
    .menu-list {
      flex: 1;
    }
  }
</style>

