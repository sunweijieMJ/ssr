<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
    <show-image></show-image>
    <!-- plyr -->
    <link rel="stylesheet" href="//static06.lanehub.cn/plyr/css/plyr-js.min.css">
    <link rel="stylesheet" href="//static06.lanehub.cn/plyr/css/plyr.css">
    <!-- iconfont -->
    <link rel="stylesheet" href="//at.alicdn.com/t/font_687718_zk8q1p510xq.css">
  </div>
</template>
<script>
  import {loadScript} from './utils/business/tools.js';
  import ShowImage from './components/mobile/business/ShowImage.vue';

  export default {
    name: 'APP',
    beforeMount() {
      this.loadSource();
    },
    methods: {
      loadSource() {
        const container = document.body;
        loadScript(container, '//static06.lanehub.cn/plyr/js/plyr.min.js', () => {
          loadScript(container, '//static06.lanehub.cn/plyr/js/plyrInit.js ');
        });
      }
    },
    components: {ShowImage}
  };
</script>
<style lang="scss">
  @import '../src/assets/scss/_reset.scss';
</style>

