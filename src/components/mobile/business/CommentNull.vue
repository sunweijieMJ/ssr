<template>
  <div class="comment-null">
      <i class="iconfont icon-content_lb_sofa"></i>
      <p>{{text}}</p>
    </div>
</template>
<script>
  export default {
    props: {
      text: {
        type: String,
        default: '暂时没有评论'
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .comment-null {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.3rem;
    background-color: #fff;
    // border-top: 0.01rem solid $borderColor;
    position: relative;
    &:after{
      content: '';
      position: absolute;
      top: 0; left: 0;
      box-sizing: border-box;
      width: 200%;
      height: 200%;
      transform: scale(0.5);
      transform-origin: left top;
      border-top: 1px solid $borderColor;
    }
    img {
      width: 3.6rem;
    }
    i {
      font-size: 2rem;
      color: #cfcfcf;
    }
    p {
      font-size: 0.28rem;
      letter-spacing: 0.2px;
      color: $subColor;
      margin: 0.2rem 0;
    }
  }
</style>

