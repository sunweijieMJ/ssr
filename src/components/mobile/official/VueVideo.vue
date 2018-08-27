<template>
  <div class="video">
    <div class="customvideo" :data-src="sources.video_url" :data-img="poster" :width="sources.width" :height="sources.height"></div>
    <remote-css src="https://static03.lanehub.cn/css/video.css"></remote-css>
  </div>
</template>
<script>
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
      // js顺序执行
      loadScript(container, url, callback) {
        let script = document.createElement('script');
        if (script.readyState) {
          script.onreadystatechange = () => {
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
              script.onreadystatechange = null;
              callback();
            }
          };
        } else {
          script.onload = () => {
            callback();
          };
        }
        script.src = url;
        container.appendChild(script);
      },
      loadSource() {
        let that = this;
        const container = document.body;
        that.loadScript(container, 'https://static03.lanehub.cn/js/video.js', () => {
          that.loadScript(container, 'https://static03.lanehub.cn/js/videoInit.js', () => {
            init();
          });
        });
      },
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



