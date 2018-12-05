<template>
  <div class="rule-page">
    <PublicTitle :pageTitle="'邀请规则'" v-if="!(response.__platform === 'app' || isTencent)"></PublicTitle>
    <div class="introduce">
      <div class="title">邀请规则</div>
      <div class="content top">
        <span>1.</span>
        <p>瓴里值达到5000的悦蓝会员可获得  1 张悦蓝会员邀请卡，升级到臻蓝会员再增加 2 张悦蓝会员邀请卡。</p>
      </div>
      <div class="content">
        <span>2.</span>
        <p>被邀请人只能接受一次邀请。</p>
      </div>
      <div class="content">
        <span>3.</span>
        <p> 活动最终解释权归瓴里所有。</p>
      </div>
      <!-- <div class="title title2">*注：以上最终解释权归瓴里所有</div> -->
    </div>
  </div>
</template>
<script>
  import hidetitle from '../../../../mixins/hidetitle.js';
  import {PublicTitle} from '../../../../components/mobile/business';

  export default {
    title() {
      return '规则页';
    },
    meta() {
      return `<meta name="description" content="规则页">
      <meta name="keywords" content="规则页">`;
    },
    components: {PublicTitle},
    mixins: [hidetitle],
    methods: {
      goBack(){
        this.$router.go(-1);
      }
    }
  };
</script>
<style lang="scss" scoped>
.rule-page{
  background-color: white;
  height: 100vh;
  .nav{
    padding: 0.26rem 0.3rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e8e8e8;
    align-items: center;
    span{
      font-size:0.36rem;
      font-family:PingFangSC-Light;
      font-weight:300;
      color:rgba(34,34,34,1);
      line-height:0.36rem;
    }
  }
  .introduce{
    padding: 0.4rem 0.3rem;
    .title{
      font-size:0.32rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(34,34,34,1);
      line-height:0.32rem;
    }
    .title2{
      font-size:0.3rem;
      font-family:PingFangSC-Light;
      font-weight:300;
      color:rgba(119,119,119,1);
      line-height:0.42rem;
      margin-top: 0.5rem;
    }
    .top{
      margin-top: 0.3rem;
    }
    .content{
      display: flex;
      justify-content: flex-start;
      font-size:0.28rem;
      color:rgba(34,34,34,1);
      span{
        line-height:0.42rem;
      }
      p{
        font-family:PingFangSC-Light;
        font-weight:300;
        line-height:0.42rem;
      }
    }
  }
}
</style>
