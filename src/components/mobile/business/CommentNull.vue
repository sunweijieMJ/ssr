<template>
  <div class="comment-null">
      <img src="../../../../static/mobile/svg/common/content_lb_sofa.svg" alt="">
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
    background-color:#f1f1f1;
    padding: 0.3rem;
    img {
      width: 3.6rem;
    }
    p {
      font-size: 0.28rem;
      letter-spacing: 0.2px;
      color: $subColor;
      margin: 0.2rem 0;
    }
  }
</style>

