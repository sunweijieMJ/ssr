<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
    <show-image></show-image>
    <guidance></guidance>
    <!-- iconfont -->
    <link rel="stylesheet" href="//at.alicdn.com/t/font_687718_dfnmquutwpu.css">
    <remote-js src="//at.alicdn.com/t/font_687718_wevpwo3gom.js"></remote-js>
  </div>
</template>
<script>
  import {ShowImage} from './components/mobile/business';
  import {Guidance} from './components/mobile/popup';

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
      ShowImage, Guidance
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

