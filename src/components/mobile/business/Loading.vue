<template>
  <div class="loading" v-if="(loading && !noMore) || (noMore && hide)">
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

  .loading {
    width: 100%;
    background-color: #fff;
    p {
      padding: 0.15rem 0;
      font-size: 0.28rem;
      line-height: 0.28rem;
      text-align: center;
      color: $themeColor;
      &:last-child {
        color: $subColor;
      }
    }
  }
</style>

