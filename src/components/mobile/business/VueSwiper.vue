<template>
  <div class="wrapper" v-swiper:mySwiper="swiperOption" :style="{height: heightChange(type)}">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,index) in images" :key="index" @click.stop="''">
        <img v-lazy="imageSize(item, sizeChange(type))" alt="" @click.stop="''">
        <vue-video
          v-if="withVideo && withVideo.status && withVideo.index === index"
          :poster="withVideo.poster"
          :sources="withVideo.sources"
          :voice="true">
        </vue-video>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import frequent from '../../../mixins/frequent.js';
  import imageSize from '../../../utils/filters/imageSize';
  import {VueVideo} from '../../../components/mobile/official';

  let that = this;
  if(process.env.VUE_ENV === 'client') {
    const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');
    Vue.use(VueAwesomeSwiper);
    that.slideWidth = document.body.clientWidth;
  }

  export default {
    mixins: [frequent],
    components: {VueVideo},
    props: {
      images: '',
      type: '',
      index: '',
      autoplay: {
        type: Boolean,
        default: false
      },
      withVideo: {
        type: Object,
        default() {
          return {
            status: false,
            index: 0
          };
        }
      }
    },
    data(){
      return {
        imageSize,
        playing: false,
        swiperOption: {
          width: that.slideWidth, // ETC slide宽度
          notNextTick: true, // ETC 组件不会通过NextTick来实例化swiper,也就意味着你可以在第一时间获取到swiper对象
          grabCursor: true, // ETC 相当于curson: point
          direction: 'horizontal', // ETC 滑动方向为左右
          autoHeight: true, // ETC 可以阻止左右滑和上下滑动冲突
          autoplay: this.autoplay && { // ETC 自动播放
            delay: 3000,
            stopOnLastSlide: true,
            disableOnInteraction: false
          },
          setWrapperSize: true, // ETC 使用flexbox布局
          observeParents: true, // ETC Swiper更新
          allowSlideNext: this.images.length > 1 ? true : false, // ETC 下一页
          allowSlidePrev: this.images.length > 1 ? true : false, // ETC 上一页
          noSwipingSelector: '.swiper-slide .plyr .plyr__controls',
          on: {
            // 存this
            touchStart: () => {
              that = this;
            },
            // 切换slide
            slideChangeTransitionStart() {
              if(that.withVideo.status) {
                const video = that.$el.querySelector('.customvideo video');
                if(video.paused) {
                  that.playing = false;
                } else {
                  that.playing = true;
                }
              }
            },
            slideChangeTransitionEnd() {
              that.$emit('to-parent', this.activeIndex, that.index);
              if(that.withVideo.status && that.playing) {
                const video = that.$el.querySelector('.customvideo video');
                if(this.activeIndex !== that.withVideo.index) {
                  video.pause();
                } else if(this.activeIndex === that.withVideo.index) {
                  video.play();
                }
              }
            },
            // 查看大图
            tap() {
              if(that.withVideo.status && this.activeIndex === that.withVideo.index) {
                that.$emit('handlePlay');
                return;
              }
              that.showImage(that.images, this.activeIndex);
            },
            click() {
              if(that.withVideo.status && this.activeIndex === that.withVideo.index) {
                that.$emit('handlePlay');
                return;
              }
              that.showImage(that.images, this.activeIndex);
            }
          }
        }
      };
    },
    created() {
      that = this;
    },
    methods: {
      heightChange(type){
        switch (+type) {
          case 6:
            return '7.5rem';
            break;
          default:
            return '4.22rem';
            break;
        }
      },
      sizeChange(type){
        switch (type) {
          case 6:
            return '750x750';
            break;
          default:
            return '750x422';
            break;
        }
      }
    }
  };
</script>
<style lang="scss">
  .wrapper{
    position: relative;
    width: 100%;
    overflow: hidden;
    .swiper-wrapper{
      .swiper-slide{
        float: left;
        img{
          width: 100%;
        }
        .video {
          position: absolute;
          left: 0; top: 0;
          width: 7.5rem;
          height: 7.5rem;
        }
      }
    }
  }
</style>


