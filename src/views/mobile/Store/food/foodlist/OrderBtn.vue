<template>
  <div class="order-btn">
    <section class="lh-footer">
      <div class="btn-icon">
        <i class="iconfont icon-shop_ic_shopping_bag"></i>
        <span v-if="0">未选择商品</span>
      </div>
      <div class="btn-price">
        <p @click="detailPopup = !detailPopup">
          <span>合计:</span>
          <i>¥</i>
          <span class="num">44</span>
          <i class="iconfont" :class="detailPopup ? 'icon-shopping_cart__ic_do' : 'icon-shopping_cart__ic_up'"></i>
        </p>
        <a href="javascript:;">下单享用</a>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        detailPopup: true
      };
    }
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
      .btn-price {
        display: flex;
        align-items: center;
        p {
          span {
            font-size: 0.28rem;
            color: $themeColor;
            &.num {
              font-size: 0.32rem;
              color: $mallRed;
            }
          }
          i {
            font-style: normal;
            font-size: 0.28rem;
            color: $mallRed;
            &.iconfont {
              margin: 0 0.2rem;
              font-size: 0.16rem;
              color: $themeColor;
            }
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
  }
</style>

