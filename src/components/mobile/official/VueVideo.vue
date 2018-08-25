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
      this.init();
    },
    mounted(){
      window.addEventListener('scroll', this.isElementInViewport, false);
    },
    methods: {
      init() {
        const Plyr = require('../../../assets/js/plyr.js').Plyr;
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
            ratio: `${video_width}:${video_height}`,
            controls: ['play-large', 'duration', 'progress', 'current-time', 'mute', 'fullscreen'],
            // controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
            blankUrl: '', // 指定用于正确取消网络请求的空白视频文件的URL或路径
            autoplay: false,
            volume: 5, // 1-10,表示初始音量
            clickToPlay: true, // 点击视频容器将切换暂停/播放
            disableContextMenu: true, // 将视频上的右键菜单禁用为帮助,作为非常原始的模糊处理,以防止内容下载。
            hideControls: true, // 2秒后无鼠标或焦距移动,控制元素隐藏(标签输出)
            tooltips:{ controls: true, seek: false }, // controls:将控制标签显示为工具提示:hover&:focus。seek:显示工具提示。
            showPosterOnEnd:true // 一旦播放完成,这将恢复和重新加载HTML5视频(可能会导致视频再次下载)
          };
          // 创建video标签并设置属性
          const myVideo = document.createElement('video');
          const videoId = `my-video-${String(Math.random()).slice(2)}`; // 随机数
          myVideo.setAttribute('id', videoId);
          myVideo.setAttribute('controls', true);
          // 阻止自动全屏
          myVideo.setAttribute('playsinline', true);
          myVideo.setAttribute('x5-playsinline', true);
          myVideo.setAttribute('webkit-playsinline', true);
          myVideo.setAttribute('x-webkit-airplay', 'allow');
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
                    type: 'video/mp4',
                }
            ],
            poster: poster_url
          };

          const video = document.querySelector('.customvideo .plyr video');
          const contain = document.querySelector('.customvideo').offsetWidth;
          video.style.height = contain / (video_width / video_height) + 'px';
        }
      },
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
<style>
  @import url('../../../assets/js/css/plyr-js.min.css');
  @import url('../../../assets/js/css/plyr.css');

  .customvideo .plyr .plyr__controls [data-plyr="mute"] {
    display: none;
  }
</style>



