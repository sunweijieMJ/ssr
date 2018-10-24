<template>
  <div class="food-list">
    <public-title :pageTitle="'咖啡轻食'"></public-title>
    <main class="menu-view">
      <nav-list></nav-list>
      <menu-list></menu-list>
    </main>
    <order-btn></order-btn>
    <food-popup></food-popup>
  </div>
</template>
<script>
  import food_list from '../../../../store/store/food_list.js';
  import {PublicTitle} from '../../../../components/mobile/business';
  import {NavList, MenuList, OrderBtn, FoodPopup} from './foodlist/index.js';

  export default {
    components: {
      PublicTitle, NavList, MenuList, OrderBtn, FoodPopup
    },
    title() {
      return '食品列表';
    },
    meta() {
      return `<meta name="description" content="食品列表">
              <meta name="keywords" content="食品列表">`;
    },
    asyncData({store}) {
      store.registerModule('food_list', food_list);
    },
    mounted() {
      let that = this;
      that.$store.registerModule('food_list', food_list, {preserveState: true});
    }
  };
</script>
<style lang="scss" scoped>
  .menu-view {
    display: flex;
    height: 12rem;
    .nav-list {
      width: 1.9rem;
      background-color: #f7f7f7;
    }
    .menu-list {
      flex: 1;
    }
  }
</style>

