<template>
  <div class="public_title">
    <section>
      <a href="javascript:window.history.go(-1);">
        <img src="../../../../static/mobile/svg/private/nav_ic_return.svg" alt="">
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

  .public_title{
    width: 100%;
    height: 0.89rem;
    position: relative;
    section{
      width: 6.9rem;
      height: 0.88rem;
      padding: 0 0.3rem;
      background: #ffffff;
      border-bottom: 1px solid #e5e5e5;
      position: fixed;
      z-index: 2000;
      top: 0;
      a{
        position: absolute;
        left: 0.3rem;
        display: flex;
        height: 0.88rem;
        align-items: center;
        img{
          width: 0.46rem;
        }
      }
      h2{
        font-size: 0.36rem;
        font-weight: 300;
        line-height: 0.88rem;
        text-align: center;
        color: #444444;
      }
    }
  }
</style>
