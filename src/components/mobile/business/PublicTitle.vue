<template>
  <div class="public-title">
    <section>
      <a href="javascript:window.history.go(-1);">
        <i class="iconfont icon-nav_ic_return"></i>
      </a>
      <h2>{{pageTitle}}</h2>
    </section>
  </div>
</template>
<script>
  export default {
    props: ['pageTitle']
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .public-title{
    width: 100%;
    height: 0.89rem;
    position: relative;
    section {
      box-sizing: border-box;
      position: fixed;
      top: 0;
      display: flex;
      justify-content: center;
      width: 7.5rem;
      height: 0.89rem;
      padding: 0 0.3rem;
      border-bottom: 0.01rem solid #e5e5e5;
      z-index: 2000;
      background: #fff;
      a {
        position: absolute;
        left: 0.3rem;
        height: 0.89rem;
        display: flex;
        align-items: center;
        i {
          font-size: 0.46rem;
          color: #333;
        }
      }
      h2 {
        font-size: 0.36rem;
        font-weight: 400;
        line-height: 0.89rem;
        text-align: center;
        font-weight: 300;
        color: $themeColor;
        @include tofl(6rem);
      }
    }
  }
</style>
