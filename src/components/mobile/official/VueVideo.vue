<template>
  <div class="video">
    <div v-if="noHaveDiv != 1" class="customvideo"
      :data-src="sources.video_url"
      :data-img="poster | imageSize('690x0')"
      :width="sources.width"
      :height="sources.height"
      @click.stop="''">
    </div>
  </div>
</template>
<script>
  import {setTimer} from '../../../utils/business/tools.js';

  export default {
    props: ['sources', 'poster', 'muted', 'noHaveDiv'],
    mounted() {
      this.init();
    },
    methods: {
      init() {
        setTimer(() => {
          if(typeof plyrInit === 'function' && typeof Plyr === 'function') {
            plyrInit();
          } else {
            this.init();
          }
        });
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

  .plyr--fullscreen-fallback video {
    height: 100% !important;
  }
  .plyr:-webkit-full-screen video {
    height: 100% !important;
  }
  .plyr:-moz-full-screen video {
    height: 100% !important;
  }
  .plyr:-ms-fullscreen video {
    height: 100% !important;
  }
  .plyr:-o-fullscreen video {
    height: 100% !important;
  }
  .plyr:fullscreen video {
    height: 100% !important;
  }
</style>



