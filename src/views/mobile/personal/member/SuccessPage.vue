<template>
  <div class="result-page">
    <div class="h1">恭喜你成为</div>
    <div class="h2">
      <img src="../../../../../static/mobile/img/new_user_logo.png" alt="">
      <span>悦蓝会员</span>
    </div>
    <div class="h3">
      <img src="../../../../../static/mobile/img/logo.png" alt="">
    </div>
    <div class="h4" @click.stop="intercept">打开 App 享受权益</div>
  </div>
</template>
<script>
import frequent from '../../../../mixins/frequent';
export default {
  mixins: [frequent],
  name: 'success',
  data(){
    return {

    };
  }
};
</script>
<style lang="scss" scoped>
.result-page{ 
  width: 100%;
  height: 100vh;
  background-image: url('../../../../../static/mobile/img/personal/img2.png');
  background-size: 100% 100%;
  text-align: center;
  .h1{
    padding-top: 0.9rem;
    font-size:0.36rem;
    font-family:PingFangSC-Light;
    font-weight:300;
    color:rgba(255,255,255,1);
    line-height:1;
  }
  .h2{
    margin-top: 0.3rem;
    font-size:0.4rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:0.56rem;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 2.42rem;
      height: 0.43rem;
      margin-right: 0.2rem;
    }
  }
  .h3{
    width: 1.72rem;
    margin: 1.22rem auto;
    img{
      width: 100%;
    }
  }
  .h4{
    padding: 0.23rem 0;
    width: 5.9rem;
    background:#0072DD;
    border-radius:0.48rem;
    font-size:0.4rem;
    font-family:PingFangSC-Light;
    font-weight:300;
    color:rgba(255,255,255,1);
    margin:2.96rem auto;
  }
}
</style>
