<template>
  <div class="product-params">
    <div class="params-title" @click="$store.dispatch('product_detail/cutToParams', true)">
      <h3>规格参数</h3>
      <p><i class="iconfont icon-shopping_next"></i></p>
    </div>
    <div class="params-content">
      <div class="image-box" v-if="product_info.basic.dimensional_imgs && product_info.basic.dimensional_imgs.length">
        <img v-for="(val, index) in product_info.basic.dimensional_imgs" :key="index" :src="val | imageSize('minSide690')" alt="">
      </div>
      <p v-for="(item,index) in product_info.params.slice(0,4)" :key="index">
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
    padding: 0.3rem 0.3rem 0;
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
        line-height: 0.24rem;
        color: $subColor;
        i {
          font-size: 12px;
          color: rgba(106,106,106,1);
          margin-left: 0.1rem;
        }
      }
    }
    .params-content {
      .image-box {
        margin-bottom: 0.5rem;
        img {
          width: 100%;
          margin: 0 auto;
        }
      }
      p {
        display: flex;
        line-height: 0.45rem;
        letter-spacing: 0.008rem;
        padding: 0.22rem 0;
        border-bottom: 0.01rem solid $borderColor;
        &:last-child {
          margin-bottom: 0;
          border-bottom: none;
        }
        span {
          font-size: 0.32rem;
          line-height: 0.48rem;
          color: $themeColor;
          &:first-of-type {
            display: inline-block;
            width: 0.8rem;
            color: $subColor;
            margin-right: 0.6rem;
          }
          &:last-child {
            flex: 1;
          }
        }
      }
    }
  }
</style>
