<template>
  <div class="product-info">
    <div class="goods-info">
      <h3>{{product_info.basic.title}}</h3>
      <integral-price :minPrice="product_info.optionsMinPrice" :maxPrice="product_info.optionsMaxPrice"></integral-price>
    </div>
    <div class="goods-btn" @click="$store.dispatch('product_detail/changeSkuPopup', {status: true, type: 1})">
      <span v-if="currentType.length !== 1">请选择规格</span>
      <p v-if="currentType.length === 1">
        <span>选择规格</span>
        <span v-for="(val,index) in currentType[0]" :key="index">{{val}}</span>
      </p>
      <img src="../../../../../../static/mobile/svg/common/shopping_next.svg" alt="">
    </div>
    <div class="goods-btn">
      <span>查看全部参数</span>
      <img src="../../../../../../static/mobile/svg/common/shopping_next.svg" alt="">
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import {IntegralPrice} from '../../../../../components/mobile/business';

  export default {
    props: ['currentType'],
    components: {IntegralPrice},
    computed: mapState({
      product_info: (store) => store.product_detail.product_info
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .product-info{
    background-color: #ffffff;
    margin-bottom: 0.2rem;
    overflow: hidden;
    .goods-info{
      padding: 0.2rem 0.3rem;
      h3{
        font-size: 0.46rem;
        font-weight: 400;
        line-height: 0.69rem;
        color: $themeColor;
      }
    }
    .goods-btn{
      padding: 0 0.3rem;
      height: 0.88rem;
      border-top: 1px solid #f5f5f5;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p{
        display: flex;
        justify-content: space-between;
        align-items: center;
        i{
          font-size: 0.24rem;
          font-style: normal;
          color: $cambridgeBlue;
        }
        span{
          font-size: 0.28rem;
          font-weight: 300;
          color: $themeColor;
          margin-right: 0.1rem;
        }
        &:last-child{
          span{
            font-size: 0.24rem;
            font-weight: 300;
            color: $subColor;
          }
        }
      }
      a{
        font-size: 0.28rem;
        font-weight: 300;
        color: $cambridgeBlue;
      }
      i{
        font-size: 0.24rem;
        font-style: normal;
        color: $cambridgeBlue;
      }
      span{
        font-size: 0.28rem;
        font-weight: 300;
        color: $themeColor;
        margin-right: 0.1rem;
      }
      img{
        width: 0.12rem;
      }
    }
  }
</style>
