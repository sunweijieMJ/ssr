<template>
  <div class="product-params">
    <div class="title">
      <h3>商品参数</h3>
      <p>查看全部参数<img src="../../../../../../static/mobile/svg/common/shopping_next.svg" alt=""></p>
    </div>
    <div class="content">
      <p v-for="(item,index) in product_info.params.slice(0,4)" :key="index">
        <span>{{item.paramTitle}}</span>
        <span>{{item.paramValue}}</span>
      </p>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';

  export default {
    computed: mapState({
      product_info: (store) => store.product_detail.product_info
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .product-params{
    padding: 0.3rem 0.3rem 0.4rem;
    background-color: #ffffff;
    margin-bottom: 0.2rem;
    .title{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.3rem;
      h3{
        font-size: 0.32rem;
        font-weight: 300;
        color: $themeColor;
      }
      p{
        display: flex;
        align-items: center;
        font-size: 0.24rem;
        font-weight: 300;
        color: $subColor;
      }
      img{
        width: 0.12rem;
        margin-left: 0.2rem;
      }
    }
    .content{
      p{
        display: flex;
        align-items: center;
        margin-bottom: 0.3rem;
        &:last-child{
          margin-bottom: 0;
        }
        span{
          font-size: 0.28rem;
          font-weight: 300;
          line-height: 0.28rem;
          color: $themeColor;
          &:first-of-type{
            display: inline-block;
            font-size: 0.24rem;
            color: $subColor;
            width: 1.2rem;
          }
          &:last-child{
            flex: 1;
            line-height: 0.4rem;
          }
        }
      }
    }
  }
</style>
