<template>
  <div class="product-info">
    <div class="goods-info">
      <h3>{{product_info.basic.title}}</h3>
      <p class="info-price">
        <i>¥</i>
        <span>{{product_info.optionsMinPrice}}</span>
        <span>{{-product_info.optionsMaxPrice}}</span>
      </p>
      <div class="info-show" @click="paramsSkip('BuyerShow', {id: product_info.basic.id})">
        <p>
          <span>愉悦度</span>
          <img src="../../../../../../static/mobile/svg/product/detail_lb_happiness_48h5.svg" alt="">
          <i>{{product_info.joyful.value}}</i>
        </p>
        <p>{{product_info.joyful.buyers_count}}次购买</p>
        <p>{{product_info.joyful.shares_count}}条体验秀</p>
      </div>
    </div>
    <div class="goods-btn" @click="$store.dispatch('product_detail/changeSkuPopup', {status: true, type: 1})">
      <span v-if="currentType.length !== 1">选择规格</span>
      <p v-if="currentType.length === 1">
        <span>选择规格</span>
        <span v-for="(val,index) in currentType[0]" :key="index">{{val}}</span>
      </p>
      <img src="../../../../../../static/mobile/svg/common/shopping_next.svg" alt="">
    </div>
    <div class="goods-btn" @click="$store.dispatch('product_detail/cutToParams', true)">
      <span>查看全部参数</span>
      <img src="../../../../../../static/mobile/svg/common/shopping_next.svg" alt="">
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import frequent from '../../../../../mixins/frequent.js';

  export default {
    mixins: [frequent],
    props: ['currentType'],
    computed: mapState({
      product_info: (store) => store.product_detail.product_info
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .product-info{
    background-color: #fff;
    margin-bottom: 0.2rem;
    .goods-info{
      padding: 0.2rem 0.3rem 0.3rem;
      h3 {
        font-size: 0.46rem;
        font-weight: 400;
        line-height: 0.69rem;
        color: $themeColor;
      }
      .info-price {
        font-size: 0.36rem;
        line-height: 0.36rem;
        color: $mallRed;
        margin: 0.15rem 0 0.4rem;
        i {
          font-size: 0.28rem;
          font-style: normal;
        }
      }
      .info-show {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 0.5rem;
        p {
          display: flex;
          align-items: center;
          font-size: 0.26rem;
          span {
            color: $subColor;
          }
          i {
            font-style: normal;
          }
          img {
            width: 0.3rem;
            margin: 0 0.04rem 0 0.1rem;
          }
        }
      }
    }
    .goods-btn{
      padding: 0 0.3rem;
      height: 0.88rem;
      border-top: 0.01rem solid #f5f5f5;
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
