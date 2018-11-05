<template>
  <div class="show-image" v-if="getImagePopup.status">
    <mt-popup
      class="animated fadeIn"
      v-model="getImagePopup.status"
      :modal="false"
      position="middle"
    >
      <span v-if="source.length > 1">{{active + 1}}/{{source.length}}</span>
      <div class="wrapper" v-swiper:mySwiper="swiperOption" @click.stop="editImage">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in source" :key="index">
            <img class="animated zoomIn" :src="item.image_url || item.image || item.thumbnail_url || item.head_url || item | imageSize('690x0')" alt="">
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import Vue from 'vue';
  import {mapGetters} from 'vuex';
  import {setTimer} from '../../../utils/business/tools.js';

  let that = this;
  if(process.env.VUE_ENV === 'client') {
    const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');
    Vue.use(VueAwesomeSwiper);
    that.slideWidth = document.body.clientWidth;
  }

  export default {
    data(){
      return {
        source: [], // ETC 图片资源
        active: 0, // ETC 当前页
        swiperOption: {
          width: that.slideWidth, // ETC slide宽度
          notNextTick: true, // ETC 组件不会通过NextTick来实例化swiper,也就意味着你可以在第一时间获取到swiper对象
          grabCursor: true, // ETC 相当于curson: point
          direction: 'horizontal', // ETC 滑动方向为左右
          autoHeight: true, // ETC 可以阻止左右滑和上下滑动冲突
          setWrapperSize: true, // ETC 使用flexbox布局
          observeParents: true, // ETC Swiper更新
          allowSlideNext: true, // ETC 下一页
          allowSlidePrev: true, // ETC 上一页
          on: {
            // 初始化,到指定slide
            init() {
              this.slideTo(that.active, 1000, false);
            },
            // 切换slide
            slideChangeTransitionEnd() {
              that.active = this.activeIndex;
              that.$store.dispatch('setImagePopup', {active: that.active});
            }
          }
        }
      };
    },
    created(){
      // 存this
      that = this;
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      $route: 'editImage',
      getImagePopup(cur) {
        if(cur.status){
          setTimer(() => {
            that.$el.children[0].addEventListener('touchmove', (e) => {
              e.preventDefault();
            });
          });

          that.active = cur.active;
          that.source = cur.source;
        }
      }
    },
    methods: {
      editImage(){
        that.$store.dispatch('setImagePopup', {status: false, active: 0, source: []});
      }
    },
    computed: mapGetters(['getImagePopup'])
  };
</script>
<style lang="scss">
  @import url('../../../assets/css/animate.css');

  .show-image {
    .mint-popup {
      width: 7.5rem;
      height: 100%;
      z-index: 3200!important;
      background-color: rgba(000,000,000,1);
      span{
        position: fixed;
        z-index: 2200;
        left: 3.2rem;top: 0.1rem;
        width: 1.1rem;
        height: 0.5rem;
        color: #ffffff;
        border-radius: 5px;
        font-size: 0.3rem;
        text-align: center;
        line-height: 0.5rem;
      }
      .swiper-container{
        overflow: hidden;
        width: 100%;
        height: 100%;
        .swiper-wrapper{
          display: flex;
          align-items: center;
          height: 100%!important;
          .swiper-slide{
            img{
              width: 7.5rem;
            }
          }
        }
      }
    }
  }
</style>


