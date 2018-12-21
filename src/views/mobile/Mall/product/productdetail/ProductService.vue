<template>
  <div class="product-service" v-if="product_info.basic.furniture_service_info">
    <div class="service-title" @click="queryAssign('service_info', {index: queryIndex()})">
      <h3>专业服务</h3>
      <p><i class="iconfont icon-shopping_next"></i></p>
    </div>
    <div class="service-content">
      <img v-for="(val, index) in product_info.basic.furniture_service_info.imgs.slice(0, 1)" :key="index" v-lazy="imageSize(val, 'minSide690')" alt="">
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import frequent from '../../../../../mixins/frequent.js';
  import imageSize from '../../../../../utils/filters/imageSize.js';

  export default {
    mixins: [frequent],
    data() {
      return {
        imageSize
      };
    },
    mounted() {
      this.queryIndex();
    },
    methods: {
      queryIndex() {
        const url = this.product_info.basic.furniture_service_info.h5url;
        if (url.indexOf('?') !== -1) {
          const str = url.split('?')[1];
          const strs = str.split('&');
          const response = {};
          for (let i = 0, LEN = strs.length; i < LEN; i++) {
            response[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
          }
          return response.index;
        }
      }
    },
    computed: mapState({
      product_info: (store) => store.product_detail.product_info
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .product-service {
    padding: 0.3rem 0.3rem 0.4rem;
    background-color: #fff;
    .service-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.4rem;
      h3 {
        font-size: 0.34rem;
        font-weight: 400;
        color: $themeColor;
      }
      p {
        display: flex;
        align-items: center;
        font-size: 0.24rem;
        line-height: 0.24rem;
        color: $subColor;
        i {
          font-size: 12px;
          color: rgba(106,106,106,1);
          margin-left: 0.1rem;
        }
      }
    }
    .service-content {
      img {
        width: 100%;
      }
      p {
        font-size: 0.28rem;
        line-height: 0.43rem;
        letter-spacing: 0.6px;
        color: $themeColor;
      }
    }
  }
</style>
