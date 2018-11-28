<template>
<div class="resultpage">
  <!-- <div class="nav">
    <span class="iconfont icon-nav_ic_return" style="font-size: 0.46rem;" @click="goBack"></span>
    <span>瓴里悦蓝 至高礼遇</span>
    <span class="iconfont icon-nav_ic_return" style="font-size: 0.46rem;opacity: 0;"></span>
  </div> -->
  <Success v-if="status === '7'"></Success>
  <div v-if="status === '4' || status === '6' || status === '5'" class="fail">
    <div class="fail-p2">
      <p v-if="status === '4' || status === '6'">您已经是瓴里 悦蓝会员</p>
      <p v-if="status === '5'">您已经是瓴里 臻蓝会员</p>
      <p>无需重复领取</p>
    </div>
    <div class="btn" @click.stop="intercept">打开 App 享受权益</div>
  </div>
  <div v-if="status === '3'" class="fail">
    <div class="fail-p2">
      <p>来晚了，该权益已经被领取。</p>
    </div>
    <div class="button" @click.stop="intercept">打开 App</div>
  </div>
  <div v-if="status === '2'" class="fail">
    <div class="fail-p2">
      <p>瓴里亲友不可以邀请自己成为悦蓝会员哦</p>
    </div>
    <div class="button" @click.stop="intercept">打开 App</div>
  </div>
</div>
</template>
<script>
import frequent from '../../../../mixins/frequent';
import Success from './SuccessPage';

export default {
  name: 'ResultPage',
  mixins: [frequent],
  components: {Success},
  data(){
    return {
      status: 0
    };
  },
  title() {
    return '结果页';
  },
  meta() {
    return `<meta name="description" content="结果页">
    <meta name="keywords" content="结果页">`;
  },
  methods: {
    goBack(){
      this.$router.go(-1);
    }
  },
  mounted(){
    this.status = this.$route.query.status;
  }
};
</script>
<style lang="scss" scoped>
// .nav{
//   position: fixed;
//   top: 0;
//   width: 6.9rem;
//   background-color: white;
//   padding: 0.23rem 0.3rem;
//   display: flex;
//   justify-content: space-between;
//   border-bottom: 1px solid #e8e8e8;
//   align-items: center;
//   span{
//     font-size:0.36rem;
//     font-family:PingFangSC-Light;
//     font-weight:300;
//     color:rgba(34,34,34,1);
//     line-height:0.36rem;
//   }
// }
.resultpage{
  background-color: white;
}
.fail{
  .fail-p2{
    margin-top: 0.8rem;
    text-align: center;
    p{
      font-size:0.44rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(34,34,34,1);
      line-height:0.66rem;
    }
  }
  .btn{
    font-size: 0.4rem;
    font-family:PingFangSC-Light;
    font-weight:300;
    text-align: center;
    width: 5.9rem;
    height: 0.96rem;
    margin: 0.4rem auto;
    background-color: #0072DD;
    color: #FFFFFF;
    border-radius:0.48rem;
    line-height: 0.96rem;
  }
  .button{
    background-color: #0072DD;
    margin: 0.4rem auto;
    width: 4.18rem;
    height: 0.96rem;
    line-height: 0.96rem;
    font-size:0.4rem;
    font-family:PingFangSC-Light;
    text-align: center;
    font-weight:300;
    color: #FFFFFF;
    border-radius:0.48rem;
    color:rgba(255,255,255,1);
  }
}
</style>
