<template>
  <div class="result-page">
    <div class="h1">恭喜你成为</div>
    <div class="h2">LANEHUB 悦蓝会员</div>
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
  background-image: url('http://img17.3lian.com/201612/26/e45ae435197271ab4e2c8cc0e713c9c6.jpg');
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
