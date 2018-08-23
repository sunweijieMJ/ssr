<template>
  <div class="box">
    <p v-if="loading && !noMore">加载中...</p>
    <p v-if="noMore && hide">到底啦</p>
  </div>
</template>
<script>
  export default {
    props: ['loading', 'noMore', 'hide']
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .box{
    width: 7.5rem;
    background-color: #fff;
    p{
      font-size: 0.28rem;
      font-weight: 300;
      line-height: 0.28rem;
      color: $themeColor;
      text-align: center;
      padding: 0.15rem 0;
      &:last-child{
        color: $subColor;
      }
    }
  }
</style>

