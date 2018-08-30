<template>
  <div class="focus-btn">
    <a @click.stop="intercept" :class="{bgColor}">
      <img v-if="!bgColor" src=".././../../../static/mobile/svg/common/custom_ic_add.svg" alt="">
      <img v-if="bgColor" src=".././../../../static/mobile/svg/profile/list_ic_follow.svg" alt="">
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
      border: solid 0.01rem #c4c5f9;
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
      img{
        width: 0.28rem;
      }
    }
  }
</style>

