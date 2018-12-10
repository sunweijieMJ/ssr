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

  .focus-btn {
    box-sizing: border-box;
    border-radius: 0.3rem;
    a{
      position: relative;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1.36rem;
      height: 0.6rem;
      border-radius: 0.3rem;
      // 细边框
      &:after{
        content: '';
        position: absolute;
        top: 0; left: 0;
        box-sizing: border-box;
        width: 200%;
        height: 200%;
        transform: scale(0.5);
        transform-origin: left top;
        border: 1px solid $buttonColor;
        border-radius: 30px;
      }
      &.bgColor {
        border: 0 none;
        background-color: $darkBlue;
        span {
          color: #fff;
        }
      }
      span{
        font-size: 0.28rem;
        font-weight: 400;
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

