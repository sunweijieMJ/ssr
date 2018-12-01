<template>
  <div class="openapp">
    <a href="javascript:;" @click.stop="intercept">App 内打开</a>
  </div>
</template>
<script>
  import frequent from '../../../mixins/frequent.js';

  export default {
    mixins: [frequent]
  };
</script>

<style lang="scss" scoped>
  @import '../../../assets/css/animate.css';
  @import '../../../assets/scss/_base.scss';

  .openapp{
    -webkit-overflow-scroll:touch;
    position: fixed;
    z-index: 2000;
    left: 0;right: 0;
    bottom: 0.9rem;
    text-align: center;
    -webkit-animation: fadeInUp 0.5s ease-in-out both;
    animation: fadeInUp 0.5s ease-in-out both;
    a{
      display: inline-block;
      width: 2.6rem;
      height: 0.8rem;
      border-radius: 0.4rem;
      background-color: $darkBlue;
      box-shadow: 0 4px 6px 0 rgba(8, 72, 209, 0.4);
      font-size: 0.32rem;
      font-family: Helvetica;
      font-weight: 300;
      line-height: 0.8rem;
      text-align: center;
      color: #ffffff;
    }
    button{
      position: absolute;
      left:0;opacity: 0;
    }
  }
</style>

