<template>
  <div class="rule-page">
    <PublicTitle :pageTitle="'邀请规则'" v-if="!(response.__platform === 'app' || isTencent)"></PublicTitle>
    <!-- <div class="nav">
      <span class="iconfont icon-nav_ic_return" style="font-size: 0.46rem;" @click="goBack"></span>
      <span>邀请规则</span>
      <span class="iconfont icon-nav_ic_return" style="font-size: 0.46rem;opacity: 0;"></span>
    </div> -->
    <div class="introduce">
      <div class="title">邀请方式</div>
      <div class="content top">
        <span>1.</span>
        <p>选择你要赠送的会员卡级别，通过微信，微博、短 信、短信、等方式发给要增卡的朋友；</p>
      </div>
      <div class="content">
        <span>2.</span>
        <p>邀请好友注册成功悦蓝会员或臻蓝会员，新用户完成 注册后可成为被邀请的会员级别；老用户登录App领取 获得会员级别；</p>
      </div>

      <div class="title title2">名额限制</div>
      <div class="content top">
        <span>1.</span>
        <p>被邀请的用户必须在一周内登录App领取，既可获得 相应的会员权益；</p>
      </div>
      <div class="content">
        <span>2.</span>
        <p>各级别的邀请权益有数量的限制：悦蓝会员（瓴里值 大于5000）可邀请 1 个朋友成为悦蓝会员、臻蓝会员（瓴里值大于10000）可邀请 2 个朋友成为悦蓝会员；</p>
      </div>

      <div class="title title2">其他</div>
      <div class="content top">
        <span>1.</span>
        <p>只能接受一次邀请；</p>
      </div>
      <div class="content">
        <span>2.</span>
        <p>本活动最终解释权归LANEHUB所有。</p>
      </div>
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
      margin-top: 0.4rem;
    }
    .top{
      margin-top: 0.3rem;
    }
    .content{
      display: flex;
      justify-content: flex-start;
      font-size:0.28rem;
      span{
        line-height:0.42rem;
      }
      p{
        font-family:PingFangSC-Light;
        font-weight:300;
        color:rgba(34,34,34,1);
        line-height:0.42rem;
      }
    }
  }
}
</style>
