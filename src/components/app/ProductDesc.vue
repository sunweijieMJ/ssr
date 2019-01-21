<template>
  <div class="product-desc rich-text">
    <div v-html="richText || response.description"></div>
    <vue-video :noHaveDiv="1"></vue-video>
  </div>
</template>
<script>
  import {VueVideo} from '../mobile/public';
  import {throttle} from '../../utils/business/tools.js';
  import imageSize from '../../utils/filters/imageSize.js';

  export default {
    props: ['response'],
    components: {VueVideo},
    data() {
      return {
        richText: false,
        event: []
      };
    },
    mounted() {
      let that = this;
      // 绑定监听
      const imgs = that.$el.querySelectorAll('img');
      for(let i = 0, LEN = imgs.length; i < LEN; i++) {
        if(imgs && global.siteType === 'app') {
          // imgs[i].addEventListener('load', () => {
          //   imgs[i].src = imageSize(imgs[i].src, '690x0');
          // }, false);
        } else {
          // const event = throttle(that.isElementInViewport.bind(null, imgs[i], i), 100);
          // that.event.push(event);
          // window.addEventListener('scroll', event, false);
        }
      }
    },
    methods: {
      isElementInViewport(el, i) {
        let that = this;
        // 元素顶端到可见区域顶端的距离
        const top = el.getBoundingClientRect().top;
        // 屏幕高度
        const se = window.innerHeight || document.documentElement.clientHeight;
        if(top <= se) {
          el.src = imageSize(el.src, '690x0');
          window.removeEventListener('scroll', that.event[i], false);
        }
      }
    }
  };
</script>
<style lang="scss">
  @import '../../assets/scss/component/_richtext.scss';
</style>

