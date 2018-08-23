<template>
  <div class="comment-null">
      <img src="../../../../static/app/img/content_ic_sofa@2x.png" alt="">
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
      width: 6.9rem;
      background-color:#f1f1f1;
      padding: 0.4rem 0.3rem;
      text-align: center;
      img {
        width: 3.6rem;
        margin: auto;
      }
      p {
        font-size: 0.28rem;
        font-weight: 300;
        line-height: 0.28rem;
        letter-spacing: 0.2px;
        text-align: center;
        color: $subColor;
        margin: 0.2rem 0;
      }
    }
</style>

