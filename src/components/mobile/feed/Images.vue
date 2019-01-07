<template>
  <div class="feed-images">
    <img v-for="(val, i) in images" :key="i" :src="val" alt="">
  </div>
</template>
<script>
  export default {
    props: ['images']
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .feed-images {
    padding: 0 0.3rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    img {
      width: 2.2rem;
      height: 2.2rem;
      margin-bottom: 0.15rem;
      border-radius: 0.04rem;
    }
  }
</style>

