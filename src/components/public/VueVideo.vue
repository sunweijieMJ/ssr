<template>
  <div class="customvideo" :data-src="sources.video_url" :data-img="poster" :width="sources.width" :height="sources.height"></div>
</template>
<script>
  export default {
    props: ['sources', 'poster'],
    mounted(){
      this.init();
      // window.addEventListener('scroll', this.isElementInViewport, false);
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
        if(!res) that.$el.querySelector('video').pause();
      },
      init() {
        const videojs = require('../../assets/js/video.js').videojs;
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
            playbackRates: [0.7, 1.0, 1.5, 2.0], // ETC 播放速度
            width: '100%',
            autoplay: false, // ETC 如果true,浏览器准备好便开始播放
            muted: false, // ETC 默认情况下将会消除任何音频
            loop: false, // ETC 是否循环
            preload: 'auto', // ETC 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
            language: 'en',
            aspectRatio: `${video_width}:${video_height}` || '16:9', // ETC 将播放器置于流畅模式,并在计算播放器的动态大小时使用该值
            fluid: true, // ETC 当true时,Video.js player将拥有流体大小
            sources: [ // ETC 资源
              {
                type: 'video/mp4', // ETC 资源类型
                src: video_url // ETC 资源url
              }
            ],
            poster: poster_url, // ETC 封面地址
            notSupportedMessage: '此视频暂无法播放,请稍后再试', // ETC 允许覆盖Video.js无法播放媒体源时显示的默认信息。
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
          };
          // 创建video标签并设置属性
          const myVideo = document.createElement('video');
          const videoId = `my-video-${String(Math.random()).slice(2)}`; // ETC 随机数
          myVideo.setAttribute('id', videoId);
          myVideo.setAttribute('class', 'video-js');
          myVideo.setAttribute('controls', true);
          // 阻止自动全屏
          myVideo.setAttribute('playsinline', true);
          myVideo.setAttribute('x5-playsinline', true);
          myVideo.setAttribute('webkit-playsinline', true);
          myVideo.setAttribute('x-webkit-airplay', 'allow');
          // 插入video标签
          videoBox[i].appendChild(myVideo);
          // video初始化
          videojs(videoId, options, function ready() {
            let isPlaying = false;
            this.on('play', () => {
              isPlaying = true;
            });
            this.on('pause', () => {
              isPlaying = false;
            });
            function toggle() {
              if(isPlaying){
                this.pause();
              } else {
                this.play();
              }
            }
            // 播放暂停按钮事件
            this.bigPlayButton.on('touchend', toggle.bind(this));
            this.bigPlayButton.on('click', toggle.bind(this));
          });
        }
      }
    }
  };
</script>
<style>
  @import 'https://static03.lanehub.cn/css/video.css';
</style>

