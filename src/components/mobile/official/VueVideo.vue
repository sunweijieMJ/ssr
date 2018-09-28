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
  import {loadScript, setTimer} from '../../../utils/business/tools.js';

  export default {
    props: ['sources', 'poster', 'muted', 'noHaveDiv'],
    beforeMount() {
      this.loadSource();
    },
    mounted() {
      this.init();
    },
    methods: {
      loadSource() {
        if(typeof Plyr === 'function') return;
        const container = document.body;
        loadScript(container, '//static06.lanehub.cn/plyr/js/plyr.min.js');
      },
      init() {
        let that = this;
        setTimer(() => {
          if(typeof Plyr === 'function') {
            that.plyrInit();
            const video = that.$el.querySelector('video');
            if(that.muted && video) video.muted = that.muted;
          } else {
            that.init();
          }
        });
      },
      plyrInit() {
        // 获取video容器
        const videoBox = document.getElementsByClassName('customvideo');
        for(let i = 0, LEN = videoBox.length; i < LEN; i++){
          // 没有video容器则不初始化
          if(!videoBox[i]) break;
          // 清空所有子节点
          videoBox[i].innerHTML = '';
          // 获取属性值
          const video_url = videoBox[i].getAttribute('data-src');
          const poster_url = videoBox[i].getAttribute('data-img');
          const video_width = parseInt(videoBox[i].getAttribute('width'), 10);
          const video_height = parseInt(videoBox[i].getAttribute('height'), 10);
          // video配置项
          const options = {
            fullscreen: {
              enabled: true,
              fallback: true,
              iosNative: false
            },
            controls: ['play-large', 'duration', 'progress', 'current-time', 'mute', 'fullscreen']
          };
          // 创建video标签并设置属性
          const myVideo = document.createElement('video');
          const videoId = `my-video-${String(Math.random()).slice(2)}`; // ETC 随机数
          myVideo.setAttribute('id', videoId);
          // 插入video标签
          videoBox[i].appendChild(myVideo);
          // video初始化
          const player = new Plyr(`#${videoId}`, options);
          // 设置资源文件
          player.source = {
            type: 'video',
            sources: [{src: video_url, type: 'video/mp4'}],
            poster: poster_url
          };

          const contain = videoBox[i].offsetWidth;
          const video = videoBox[i].querySelector('.plyr video');
          video.muted = false;
          video.style.height = (contain / (video_height >= video_width ? 1 : video_width / video_height)) + 'px';
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
