<template>
  <div class="focus-btn">
    <a @click.stop="intercept" :class="{bgColor}">
      <i class="iconfont icon-shopping_ic_number_a" :class="{bgColor}"></i>
      <span>关注</span>
    </a>
  </div>
</template>
<script>
  import frequent from '../../../mixins/frequent.js';

  export default {
    mixins: [frequent],
    props: {
      bgColor: {
        type: Boolean,
        default: false
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .focus-btn{
    a{
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1.36rem;
      height: 0.6rem;
      border-radius: 0.3rem;
      border: 0.01rem solid #bbd6ef;
      &.bgColor {
        border: 0 none;
        background-color: $darkBlue;
        span {
          color: #fff;
        }
      }
      span{
        font-size: 0.28rem;
        color: $darkBlue;
        margin-left: 0.05rem;
      }
      i {
        font-size: 0.24rem;
        line-height: 0.6rem;
        color: $darkBlue;
        &.bgColor {
          color: #fff;
        }
      }
    }
  }
</style>

