<template>
  <div class="product-desc rich-text">
    <div v-html="richText || response.description"></div>
    <p>{{test}}</p>
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
        test: '',
        richText: false
      };
    },
    mounted() {
      let that = this;
      // 绑定监听
      window.addEventListener('scroll', throttle(that.isElementInViewport.bind(null, that.$el), 100), false);
    },
    methods: {
      isElementInViewport(el) {
        let that = this;
        that.test = 'sun';
        // 元素顶端到可见区域顶端的距离
        const top = el.getBoundingClientRect().top;
        // 屏幕高度
        const se = window.innerHeight || document.documentElement.clientHeight;
        if(top <= se) {
          let pattern = /src=['"]?([^'"]*)['"]?/ig;
          that.richText = that.response.description.replace(pattern, ($1, $2) => {
            return `src="${imageSize($2, '690x0')}"`;
            window.removeEventListener('scroll', throttle, false);
          });
        }
      }
    }
  };
</script>
<style lang="scss">
  @import '../../assets/scss/component/_richtext.scss';

  .product-desc div {
    padding: 0;
  }
</style>

