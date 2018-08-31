<template>
  <div class="customvideo" :data-src="sources.video_url" :data-img="poster | imageSize('690x0')" :width="sources.width" :height="sources.height"></div>
</template>
<script>
  import plyrInit from '../../../../static/plyr/js/plyrInit.js';

  export default {
    props: ['sources', 'poster', 'muted'],
    mounted(){
      plyrInit();
      window.addEventListener('scroll', this.isElementInViewport, false);
    },
    methods: {
      isElementInViewport() {
        let that = this;
        const offsetTop = 0;
        // 元素顶端到可见区域顶端的距离
        const top = that.$el.getBoundingClientRect().top;
        // 元素可视高度
        const h = that.$el.clientHeight;
        // 屏幕高度
        const se = window.innerHeight || document.documentElement.clientHeight;
        const res = (top <= se) && (top >= offsetTop - h);
        if(!res && that.$el.querySelector('video')) that.$el.querySelector('video').pause();
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
  @import '../../../../static/plyr/css/plyr-js.min.css';
  @import '../../../../static/plyr/css/plyr.css';

  .customvideo {
    .plyr .plyr__controls [data-plyr="mute"]{
      display: none;
    }
  }
</style>



