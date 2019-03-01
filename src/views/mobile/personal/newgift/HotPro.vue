<template>
  <div class="hot-pro">
    <div class="title">
      <span class="iconfont icon-download_ic_logo"></span>
      <!-- <span class="iconfont icon-footer_ic_logo"></span> -->
      <span class="lanehub"> LANEHUB </span>
      <span>热门商品</span>
    </div>
    <div class="hot-pro-img">
      <div>
        <img src="../../../../../static/mobile/img/personal/gift02.png" alt="">
      </div>
      <div>
        <img src="../../../../../static/mobile/img/personal/gift2.png" alt="">
      </div>
      <div>
        <img src="../../../../../static/mobile/img/personal/gift3.png" alt="">
      </div>
      <div>
        <img src="../../../../../static/mobile/img/personal/gift4.png" alt="">
      </div>
      <div>
        <img src="../../../../../static/mobile/img/personal/gift5.png" alt="">
      </div>
      <div>
        <img src="../../../../../static/mobile/img/personal/gift6.png" alt="">
      </div>
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
  .title{
    padding: 0 0.3rem;
    // display: flex;
    // align-items: center;
    font-size:0.4rem;
    font-weight:400;
    color: #222222;
    .iconfont{
      font-size: 0.4rem;
      // margin-right: 0.09rem;
    }
    .lanehub{
      font-weight: 500;
    }
  }
  .hot-pro-img{
    width: 100%;
    margin-top: 0.3rem;
    overflow-x: scroll;

    display: flex;
    justify-content: flex-start;
    &::-webkit-scrollbar {display:none}
    div{
      width: 5rem;
      height: 2.81rem;
      margin-left: 0.3rem;
    }
    img{
      width: 5rem;
      height: 2.81rem;
      border-radius:0.1rem;
    }
    
  }
}
</style>
