<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
    <show-image></show-image>
    <!-- iconfont -->
    <link rel="stylesheet" href="//at.alicdn.com/t/font_687718_1ec5mkv16vm.css">
    <remote-js src="//at.alicdn.com/t/font_687718_wi9qq35a7fj.js"></remote-js>
  </div>
</template>
<script>
  import {ShowImage} from './components/mobile/business';

  export default {
    name: 'APP',
    components: {
      'remote-js': {
        render(createElement) {
          return createElement('script', {attrs: {type: 'text/javascript', src: this.src}});
        },
        props: {
          src: {type: String, required: true}
        }
      },
      ShowImage
    }
  };
</script>
<style lang="scss">
  @import '../src/assets/scss/_reset.scss';

  html, body, #app {
    position: static !important;
    margin: auto !important;
  }
</style>

