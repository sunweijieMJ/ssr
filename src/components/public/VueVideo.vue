<template>
  <video-player class="vjs-custom-skin"
    ref="videoPlayer"
    :options="playerOptions"
    :playsinline="true"
    customEventName="customstatechangedeventname"
    @ready="playerReadied"
    @play="onPlayerPlay($event)"
    @pause="onPlayerPause($event)">
  </video-player>
</template>
<script>
  //import 'video.js/dist/video-js.css';
  //import 'vue-video-player/src/custom-theme.css';
  import {videoPlayer} from 'vue-video-player';

  export default {
    props: ['sources', 'poster'],
    components: {
      videoPlayer
    },
    data(){
      return {
        // 播放配置文件
        playerOptions: {
          playbackRates: [0.7, 1.0, 1.5, 2.0], // ETC 播放速度
          width: '100%',
          autoplay: false, // ETC 如果true,浏览器准备好便开始播放
          muted: false, // ETC 默认情况下将会消除任何音频
          loop: false, // ETC 是否循环
          preload: 'auto', // ETC 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'en',
          aspectRatio: this.sources.height >= this.sources.width ? '1:1' : `${this.sources.width}:${this.sources.height}`, // ETC 将播放器置于流畅模式,并在计算播放器的动态大小时使用该值
          fluid: true, // ETC 当true时,Video.js player将拥有流体大小
          sources: [ // ETC 资源
            {
              type: 'video/mp4',
              src: this.sources.video_url // ETC 资源url
            }
          ],
          poster: this.poster, // ETC 封面地址
          notSupportedMessage: '此视频暂无法播放，请稍后再试', // ETC 允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            playToggle: false, // ETC 播放按钮
            progressControl: true, // ETC 进度条
            volumePanel: false && { // ETC 是否显示声音按钮
              inline: false,
              vertical: true
            },
            timeDivider: false, // ETC 时间分割线
            durationDisplay: true, // ETC 总时间
            remainingTimeDisplay: false, // ETC 剩余时间
            fullscreenToggle: true  // ETC 全屏按钮
          }
        },
        isplaying: false // ETC 是否在播放
      };
    },
    mounted(){
      //window.addEventListener('scroll', this.isElementInViewport, false);
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
        //const se = window.innerHeight || document.documentElement.clientHeight;
        se = document.documentElement.clientHeight;
        const res = (top <= se) && (top >= offsetTop - h);
        if(!res) that.$el.querySelector('video').pause();
      },
      playerReadied(player){
        let that = this;
        player.bigPlayButton.on('touchend', () => {
          if(that.isplaying){
            player.pause();
          } else {
            player.play();
          }
        });
      },
      // 播放
      onPlayerPlay(player) {
        this.isplaying = true;
      },
      // 暂停
      onPlayerPause(player) {
        this.isplaying = false;
      }
    }
  };
</script>
<style lang="scss">
  //@import url('../../assets/style/custom-theme.less');
</style>
