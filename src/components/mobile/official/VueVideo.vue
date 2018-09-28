<template>
  <div class="video">
    <div v-if="noHaveDiv != 1" class="customvideo"
      :data-src="sources.video_url"
      :data-img="poster | imageSize('690x0')"
      :width="sources.width"
      :height="sources.height"
      @click.stop="''">
    </div>
    <!-- plyr.css -->
    <link rel="stylesheet" href="//static06.lanehub.cn/plyr/css/plyr-js.min.css">
    <link rel="stylesheet" href="//static06.lanehub.cn/plyr/css/plyr.css">
  </div>
</template>
<script>
  import {loadScript} from '../../../utils/business/tools.js';

  export default {
    props: ['sources', 'poster', 'muted', 'noHaveDiv'],
    mounted() {
      this.init();
    },
    methods: {
      init() {
        let that = this;
        try {
          plyrInit();
          const video = that.$el.querySelector('video');
          if(that.muted && video) video.muted = that.muted || false;
        } catch (err) {
          const container = document.body;
          loadScript(container, '//static06.lanehub.cn/plyr/js/plyr.min.js', () => {
            loadScript(container, '//static06.lanehub.cn/plyr/js/plyrInit.js', () => {
              plyrInit();
              const video = that.$el.querySelector('video');
              if(that.muted && video) video.muted = that.muted || false;
            });
          });
        }
      }
    },
    watch: {
      muted(cur){
        this.$el.querySelector('video').muted = cur;
      }
    }
  };
</script>
<style lang="scss">
  .customvideo {
    .plyr .plyr__controls [data-plyr="mute"]{
      display: none;
    }
  }
</style>
