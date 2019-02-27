<template>
  <div class="hot-pro">
    <div class="title">
      <span class="iconfont icon-download_ic_logo"></span>
      <span class="iconfont icon-footer_ic_logo"></span>
      <span>热门商品</span>
    </div>
    <div class="img">
      <img src="../../../../../static/mobile/img/personal/img1.png" alt="">
    </div>
  </div>
</template>
<script>
export default {
  name: 'hotpro',
  data(){
    return {

    };
  }
};
</script>
<style lang="scss" scoped>
.hot-pro{
  padding: 0 0.3rem;
  .title{
    margin-top: 0.05rem;
    font-size:0.4rem;
    font-weight:400;
    color: #222222;
    .iconfont{
      font-size: 0.4rem;
      margin-right: 0.09rem;
    }
    span{
      line-height: 1;
    }
  }
  .img{
    width: 100%;
    height: 3.88rem;
    background-color: #ccc;
    margin-top: 0.3rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
