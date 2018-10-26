<template>
  <nav class="nav-list">
    <li v-for="(item, index) in food_list" :key="index" :class="{active: current === index}" @click="setScrollTop($event, index)">
      <a href="javascript:;">{{item.category_name}}</a>
    </li>
  </nav>
</template>
<script>
  import {mapState} from 'vuex';

  export default {
    props: ['current', 'setScrollTop'],
    computed: mapState({
      food_list: (store) => store.food_list.food_list
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .nav-list {
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    li {
      box-sizing: border-box;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1.9rem;
      height: 0.92rem;
      border: {
        left: 0.04rem solid #f7f7f7;
        bottom: 0.01rem solid $borderColor;
      }
      &.active {
        background-color: #fff;
        border-left-color: $darkBlue;
        a {
          color: $themeColor;
        }
      }
      a {
        font-size: 0.3rem;
        color: $subColor;
      }
    }
  }
</style>

