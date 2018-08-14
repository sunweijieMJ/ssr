<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'APP'
  };
</script>
<style lang="scss">
  @import '../src/assets/scss/_reset.scss';
</style>

