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
    background-color:#f5f5f5;
    border-top: 0.01rem solid $borderColor;;
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

