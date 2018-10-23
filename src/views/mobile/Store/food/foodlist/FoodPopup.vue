<template>
  <div class="food-popup">
    <mt-popup
      class="lb_footer"
      v-model="test"
      position="middle"
    >
      <food-info></food-info>
    </mt-popup>
  </div>
</template>
<script>
  import FoodInfo from './FoodInfo.vue';

  export default {
    components: {
      FoodInfo
    },
    data() {
      return {
        test: true
      };
    }
  };
</script>
<style lang="scss" scoped>
  .food-popup {
    .mint-popup {
      width: 6.7rem;
      height: 9rem;
      border-radius: 0.2rem;
      background-color: #fff;
    }
  }
</style>


