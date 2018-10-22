<template>
  <div class="food-list">
    <public-title :pageTitle="'咖啡轻食'"></public-title>
    <main class="menu-view">
      <nav-list></nav-list>
      <menu-list></menu-list>
    </main>
    <order-btn></order-btn>
  </div>
</template>
<script>
  import {PublicTitle} from '../../../../components/mobile/business';
  import NavList from './foodlist/NavList.vue';
  import MenuList from './foodlist/MenuList.vue';
  import OrderBtn from './foodlist/OrderBtn.vue';

  export default {
    components: {
      PublicTitle, NavList, MenuList, OrderBtn
    },
    title() {
      return '食品列表';
    },
    meta() {
      return `<meta name="description" content="食品列表">
              <meta name="keywords" content="食品列表">`;
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

