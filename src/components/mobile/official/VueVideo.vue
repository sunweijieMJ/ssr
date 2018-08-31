<template>
  <div class="video">
    <div class="customvideo"
      :data-src="sources.video_url"
      :data-img="poster | imageSize('690x0')"
      :width="sources.width"
      :height="sources.height"
      @click.stop="''">
    </div>
    <remote-css src="https://static06.lanehub.cn/plyr/css/plyr-js.min.css"></remote-css>
    <remote-css src="https://static06.lanehub.cn/plyr/css/plyr.css"></remote-css>
  </div>
</template>
<script>
  import {loadScript} from '../../../utils/business/tools.js';
  export default {
    props: ['sources', 'poster', 'muted'],
    components: {
      'remote-css': {
        render(createElement) {
          return createElement('link', {attrs: {rel: 'stylesheet', href: this.src}});
        },
        props: {
          src: {type: String, required: true}
        }
      }
    },
    beforeMount() {
      this.loadSource();
    },
    mounted(){
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
      },
      loadSource() {
        const container = document.body;
        loadScript(container, 'https://static06.lanehub.cn/plyr/js/plyr.min.js', () => {
          loadScript(container, 'https://static06.lanehub.cn/plyr/js/plyrInit.js ', () => {
            plyrInit();
          });
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
</style>



