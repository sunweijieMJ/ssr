<template>
  <div class="product-service">
    <div class="service-title" @click="querySkip('ProService')">
      <h3>专业服务</h3>
      <p><i class="iconfont icon-shopping_next"></i></p>
    </div>
    <div class="service-content">

    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import frequent from '../../../../../mixins/frequent.js';

  export default {
    mixins: [frequent],
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
      p {
        font-size: 0.28rem;
        line-height: 0.43rem;
        letter-spacing: 0.6px;
        color: $themeColor;
      }
    }
  }
</style>
