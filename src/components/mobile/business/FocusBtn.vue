<template>
  <div class="focus-btn">
    <a>
      <img src=".././../../../static/app/svg/customer/custom_ic_add.svg" alt="">
      <span>关注</span>
    </a>
  </div>
</template>
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
      span{
        font-size: 0.28rem;
        color: $darkBlue;
      }
      img{
        width: 0.28rem;
      }
    }
  }
</style>

