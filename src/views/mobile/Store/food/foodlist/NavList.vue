<template>
  <nav class="nav-list">
    <li v-for="(item, index) in nav" :key="index" :class="{active: current_nav === index}">
      <a href="javascript:;">{{item}}</a>
      <!-- <span>1</span> -->
    </li>
  </nav>
</template>
<script>
  export default {
    data() {
      return {
        nav: ['咖啡轻食', '鲜榨果蔬汁', '茶', '健康轻食', '咖啡轻食', '鲜榨果蔬汁', '茶', '健康轻食', '咖啡轻食', '鲜榨果蔬汁', '茶', '健康轻食', '咖啡轻食', '鲜榨果蔬汁', '茶', '健康轻食'],
        current_nav: 1
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .nav-list {
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    li {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1.86rem;
      height: 0.92rem;
      border-left: 0.04rem solid #f7f7f7;
      &.active {
        background-color: #fff;
        border-color: $darkBlue;
        a {
          color: $themeColor;
        }
      }
      a {
        font-size: 0.3rem;
        color: $subColor;
      }
      span {
        position: absolute;
        top: 0; right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 0.32rem;
        height: 0.32rem;
        border-radius: 50%;
        background-color: $mallRed;
        font-size: 0.24rem;
        color: #fff;
      }
    }
  }
</style>

