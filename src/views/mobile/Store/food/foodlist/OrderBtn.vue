<template>
  <div class="order-btn">
    <section class="lh-footer">
      btn
    </section>
  </div>
</template>
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
      width: 7.5rem;
      height: 1.08rem;
      box-shadow: inset 0 1px 0 0 $borderColor;
      background-color: #fff;
    }
  }
</style>

