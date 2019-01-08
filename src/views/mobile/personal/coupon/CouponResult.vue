<template>
  <div class="result">
    <!-- 优惠券结果页 -->
    <!-- <FailPage></FailPage> -->
    <!-- <SuccessPage></SuccessPage> -->
    <div class="success">
      <div>领取成功</div>
      <div class="gray">优惠券已经放入你的账户中</div>
      <div class="suc-btn">打开 App 去使用</div>
    </div>
    <div class="had" v-if="0">
      <div v-if="0">您已经领取过</div>
      <div>来晚了，该活动已结束</div>
      <div class="btn">打开 App</div>
    </div>
  </div>
</template>
<script>
import FailPage from './FailPage';
import SuccessPage from './SuccessPage';
export default {
  name: 'CouponResult',
  components: {
    FailPage,
    SuccessPage
  },
  data(){
    return {

    };
  }
};
</script>
<style lang="scss" scoped>
.result{
  .success{
    width: 100%;
    text-align: center;
    margin-top: 0.8rem;
    div{
      font-size:0.44rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(34,34,34,1);
      line-height:1;
    }
    .gray{
      margin-top: 0.3rem;
      font-size: 0.32rem;
      color: #aaa;
    }
    .suc-btn{
      margin: 0.4rem auto;
      width:4.18rem;
      height:0.96rem;
      background:rgba(0,114,221,1);
      border-radius:48px;
      text-align: center;
      line-height: 0.96rem;
      font-size:0.4rem;
      font-family:PingFangSC-Light;
      font-weight:300;
      color:rgba(255,255,255,1);
    }
  }
  .had{
    width: 100%;
    text-align: center;
    margin-top: 0.8rem;
    div{
      font-size:0.44rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(34,34,34,1);
      line-height:1;
    }
    .btn{
      margin: 0.4rem auto;
      width:4.18rem;
      height:0.96rem;
      background:rgba(0,114,221,1);
      border-radius:48px;
      text-align: center;
      line-height: 0.96rem;
      font-size:0.4rem;
      font-family:PingFangSC-Light;
      font-weight:300;
      color:rgba(255,255,255,1);
    }
  }
}
</style>
