<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
    <show-image></show-image>
    <app-link></app-link>
  </div>
</template>
<script>
  import {ShowImage, AppLink} from './components/mobile/popup';

  export default {
    name: 'APP',
    components: {ShowImage, AppLink}
  };
</script>
<style lang="scss">
  @import '../src/assets/scss/_reset.scss';
  @import '../src/assets/scss/_base.scss';

  html {
    position: static !important;
    @include css3(text-size-adjust, 100% !important);
  }
</style>

