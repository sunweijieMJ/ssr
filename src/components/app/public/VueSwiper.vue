<template>
  <div class="wrapper" :style="{height: heightChange(type)}">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item,index) in images" :key="index" @click.stop="''">
        <img v-lazy="imageSize(item, sizeChange(type))" alt="">
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
  import imageSize from '../../../utils/filters/imageSize';
  import {swiper, swiperSlide} from 'vue-awesome-swiper';
  let that = this;

  export default {
    props: ['images', 'type', 'index'],
    components: {
      swiper, swiperSlide
    },
    data(){
      return {
        imageSize,
        swiperOption: {
          width: document.body.clientWidth, // ETC slide宽度
          notNextTick: true, // ETC 组件不会通过NextTick来实例化swiper,也就意味着你可以在第一时间获取到swiper对象
          grabCursor: true, // ETC 相当于curson: point
          direction: 'horizontal', // ETC 滑动方向为左右
          autoHeight: true, // ETC 可以阻止左右滑和上下滑动冲突
          setWrapperSize: true, // ETC 使用flexbox布局
          observeParents: true, // ETC Swiper更新
          allowSlideNext: this.images.length > 1 ? true : false, // ETC 下一页
          allowSlidePrev: this.images.length > 1 ? true : false, // ETC 上一页
          on: {
            // 存this
            touchStart: () => {
              that = this;
            },
            // 切换slide
            slideChangeTransitionEnd() {
              that.$emit('to-parent', this.activeIndex, that.index);
            },
            // 查看大图
            tap() {
              window.sessionStorage.setItem('product_image', JSON.stringify({images: that.images, index: this.activeIndex}));
              that.$store.dispatch('showImage', true);
            }
          }
        }
      };
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
    width: 100%;
    .swiper-wrapper{
      .swiper-slide{
        float: left;
        img{
          width: 7.5rem;
        }
      }
    }
  }
</style>


