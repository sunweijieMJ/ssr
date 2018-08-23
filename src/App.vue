<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
    <ShowImage></ShowImage>
  </div>
</template>
<script>
  import ShowImage from './components/mobile/business/ShowImage.vue';

  export default {
    name: 'APP',
    components: {ShowImage}
  };
</script>
<style lang="scss">
  @import '../src/assets/scss/_reset.scss';
</style>

