<template>
  <div class="order-btn">
    <section class="lh-footer">
      <p class="btn-icon">
        <i class="iconfont icon-shop_ic_shopping_bag"></i>
        <span>未选择商品</span>
      </p>
      <a href="javascript:;" @click="intercept">下单享用</a>
    </section>
  </div>
</template>
<script>
  import frequent from '../../../../../mixins/frequent.js';

  export default {
    mixins: [frequent]
  };
</script>

<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .order-btn {
    position: relative;
    width: 100%;
    height: 1.08rem;
    .lh-footer {
      position: fixed;
      bottom: 0;
      z-index: 2000;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 6.9rem;
      height: 1.08rem;
      padding: 0 0.3rem;
      box-shadow: inset 0 1px 0 0 $borderColor;
      background-color: #fff;
      .btn-icon {
        display: flex;
        align-items: center;
        i {
          font-size: 0.44rem;
          color: $themeColor;
        }
        span {
          margin-left: 0.16rem;
          font-size: 0.28rem;
          color: $subColor;
        }
      }
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2.8rem;
        height: 0.8rem;
        border-radius: 0.4rem;
        background-color: $darkBlue;
        font-size: 0.32rem;
        color: #fff;
      }
    }
  }
</style>

