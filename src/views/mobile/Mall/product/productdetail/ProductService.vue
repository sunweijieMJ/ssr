<template>
  <div class="product-service" v-if="product_info.service.genenal">
    <div class="service-title" @click="querySkip('ServiceInfo')">
      <h3>{{product_info.service.genenal.title}}</h3>
      <p>查看全部服务<img src="../../../../../../static/mobile/svg/common/shopping_next.svg" alt=""></p>
    </div>
    <div class="service-content">
      <p>{{product_info.service.genenal.value[0]}}</p>
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
    border-bottom: 0.01rem solid $borderColor;
    .service-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.3rem;
      h3 {
        font-size: 0.32rem;
        font-weight: 300;
        color: $themeColor;
      }
      p {
        display: flex;
        align-items: center;
        font-size: 0.24rem;
        color: $subColor;
      }
      img {
        width: 0.12rem;
        margin-left: 0.2rem;
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
