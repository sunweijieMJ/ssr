<template>
  <div class="video">
    <div v-if="noHaveDiv != 1" class="customvideo"
      :style="{width: type != 6 || $route.name === 'MomentDetail' ? '100%' : `${(sources.width/sources.height)*3.35}rem`}"
      :data-src="sources.video_url"
      :data-img="poster | imageSize('690x0')"
      :width="sources.width"
      :height="sources.height"
      @click.stop="''">
    </div>
    <a href="javascript:;" v-show="voice" @click.stop="sound = !sound">
      <i :class="sound ? 'icon-nav_ic_no_voice' : 'icon-nav_ic_voice'" class="iconfont"></i>
    </a>
    <!-- plyr.css -->
    <link rel="stylesheet" href="//static06.lanehub.cn/plyr/css/plyr-js.min.css">
    <link rel="stylesheet" href="//static06.lanehub.cn/plyr/css/plyr.css">
  </div>
</template>
<script>
  import {loadScript, throttle} from '../../../utils/business/tools.js';

  export default {
    props: ['sources', 'poster', 'muted', 'noHaveDiv', 'voice', 'type'],
    data() {
      return {
        sound: false
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        let that = this;
        try {
          that.plyrInit();
          const video = that.$el.querySelector('video');
          if(that.muted && video) video.muted = that.muted || false;
        } catch (err) {
          const container = document.body;
          loadScript(container, '//static06.lanehub.cn/plyr/versions/plyr.polyfilled.js', () => {
            that.plyrInit();
            const video = that.$el.querySelector('video');
            if(that.muted && video) video.muted = that.muted || false;
          });
        }
      },
      plyrInit() {
        // 获取video容器
        const videoBox = document.getElementsByClassName('customvideo');
        for (let i = 0, LEN = videoBox.length; i < LEN; i++) {
          // 没有video容器则不初始化
          if (!videoBox[i]) break;
          // 清空所有子节点
          videoBox[i].innerHTML = '';
          // 获取属性值
          const video_url = videoBox[i].getAttribute('data-src');
          let poster_url = videoBox[i].getAttribute('data-img');
          // 替换为等宽，高度自适应
          poster_url = poster_url.replace(/(app|m|pc)-(\d{4,5})/g, 'm-10001');
          const video_width = parseInt(videoBox[i].getAttribute('width'), 10);
          const video_height = parseInt(videoBox[i].getAttribute('height'), 10);
          // video配置项
          const options = {
            fullscreen: {iosNative: true},
            controls: ['play-large', 'duration', 'progress', 'current-time', 'mute', 'fullscreen']
          };
          // 创建video标签并设置属性
          const myVideo = document.createElement('video');
          // 随机数
          const videoId = `my-video-${String(Math.random()).slice(2)}`;
          myVideo.setAttribute('id', videoId);
          // 插入video标签
          videoBox[i].appendChild(myVideo);
          // video初始化
          const player = new Plyr(`#${videoId}`, options);

          // 设置资源文件
          player.source = {
            type: 'video',
            sources: [
              {
                src: video_url,
                type: 'video/mp4'
              }
            ],
            poster: poster_url
          };

          const contain = videoBox[i].offsetWidth;
          const video = videoBox[i].querySelector('.plyr video');
          video.muted = false;
          video.style.height = (contain / (video_width / video_height)) + 'px';
          if(+this.type === 6 && this.$route.name !== 'MomentDetail') video.style.height = '3.38rem';

          // 绑定监听
          window.addEventListener('scroll', throttle(this.isElementInViewport.bind(null, video), 500), false);
        }
      },
      isElementInViewport(video) {
        const offsetTop = 0;
        // 元素顶端到可见区域顶端的距离
        const top = video.getBoundingClientRect().top;
        // 元素可视高度
        const h = video.clientHeight;
        // 屏幕高度
        const se = window.innerHeight || document.documentElement.clientHeight;
        const res = (top <= se) && (top >= offsetTop - h);
        if(!res) video.pause();
      }
    },
    watch: {
      sound(cur) {
        this.$el.querySelector('video').muted = cur;
      },
      muted(cur){
        this.$el.querySelector('video').muted = cur;
      }
    }
  };
</script>
<style lang="scss" scoped>
  .video {
    position: relative;
    a {
      position: absolute;
      right: 0;top: 0.3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1.05rem;
      height: 0.6rem;
      border-radius: 2px 0 0 2px;
      background-color: rgba(000, 000, 000, 0.5);
      i {
        font-size: 0.4rem;
        color: #ffffff;
      }
    }
  }
</style>
<style lang="scss">
  .customvideo {
    .plyr .plyr__controls .plyr__volume{
      display: none;
    }
  }
</style>
