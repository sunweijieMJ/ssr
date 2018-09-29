<template>
  <div class="product-btn lh-footer">
    <section class="lh-footer">
      <div class="shop_car">
        <i class="iconfont icon-detail_ic_shoppingba"></i>
        <span>购物车</span>
      </div>
      <div class="shopping-btn">
        <a v-show="sellOut" href="javascript:;" @click="activePopup">加入购物车</a>
        <a v-show="sellOut" href="javascript:;" @click="activePopup">立即购买</a>
        <a v-show="!sellOut" href="javascript:;">售罄</a>
      </div>
    </section>
  </div>
</template>
<script>
  import {mapState} from 'vuex';

  export default {
    methods: {
      // 激活弹框
      activePopup(){
        let that = this;
        that.$store.dispatch('product_detail/changeSkuPopup', {status: true});
      }
    },
    computed: {
      ...mapState({
        product_info: (store) => store.product_detail.product_info
      }),
      sellOut() {
        let that = this;
        for(let i = 0, LEN = that.product_info.options.length; i < LEN; i++){
          if(that.product_info.options[i].stock > 0) return true;
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .product-btn{
    width: 100%;
    height: 1.08rem;
    position: relative;
    section {
      width: 7.2rem;
      height: 1.08rem;
      background-color: #ffffff;
      padding-right: 0.3rem;
      position: fixed;
      bottom: 0;
      z-index: 2000;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: inset 0 0.01rem 0 0 rgba(229, 229, 229, 0.5);
      .shop_car{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 1.4rem;
        height: 0.8rem;
        i{
          font-size: 0.46rem;
          color: $subColor;
          margin-bottom: 0.1rem;
        }
        span{
          font-size: 0.2rem;
          line-height: 0.2rem;
          color: $subColor;
        }
      }
      .shopping-btn{
        display: flex;
        flex: 1;
        height: 0.8rem;
        a{
          cursor: pointer;
          height: 0.8rem;
          font-size: 0.32rem;
          font-weight: 300;
          line-height: 0.8rem;
          text-align: center;
          color: #ffffff;
          &:first-child{
            width: 2.9rem;
            border-radius: 0.6rem 0 0 0.6rem;
            background: linear-gradient(to right, #47affb, #1589f6);
          }
          &:nth-child(2){
            width: 2.9rem;
            border-radius: 0 0.6rem 0.6rem 0;
            background-color: $darkBlue;
          }
          &:last-child{
            width: 5.8rem;
            border-radius: 0.6rem;
            background-color: #bcc0c9;
          }
        }
      }
    }
  }
</style>
