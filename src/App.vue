<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
    <show-image></show-image>
    <guidance></guidance>
  </div>
</template>
<script>
  import {ShowImage} from './components/mobile/business';
  import {Guidance} from './components/mobile/popup';

  export default {
    name: 'APP',
    components: {
      ShowImage, Guidance
    }
  };
</script>
<style lang="scss">
  @import '../src/assets/scss/_reset.scss';
  @import '../src/assets/scss/_base.scss';

  html {
    position: static !important;
    background-color: #fff;
    @include css3(text-size-adjust, 100% !important);
  }
</style>

