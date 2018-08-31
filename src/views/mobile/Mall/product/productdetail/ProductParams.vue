<template>
  <div class="product-params">
    <div class="params-title" @click="$store.dispatch('product_detail/cutToParams', true)">
      <h3>商品参数</h3>
      <p>查看全部参数<img src="../../../../../../static/mobile/svg/common/shopping_next.svg" alt=""></p>
    </div>
    <div class="params-content">
      <p v-for="(item,index) in product_info.params.slice(0,3)" :key="index">
        <span>{{item.paramTitle}}</span>
        <span>{{item.paramValue}}</span>
      </p>
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

  .product-params {
    padding: 0.3rem 0.3rem 0.4rem;
    background-color: #fff;
    margin-bottom: 0.2rem;
    .params-title {
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
        color: $subColor;
      }
      img {
        width: 0.12rem;
        margin-left: 0.2rem;
      }
    }
    .params-content {
      p {
        display: flex;
        align-items: center;
        line-height: 0.3rem;
        margin-bottom: 0.5rem;
        &:last-child {
          margin-bottom: 0;
        }
        span {
          font-size: 0.3rem;
          color: $themeColor;
          &:first-of-type {
            display: inline-block;
            color: $subColor;
            width: 1.2rem;
          }
          &:last-child {
            flex: 1;
          }
        }
      }
    }
  }
</style>
