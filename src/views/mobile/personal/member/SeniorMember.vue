<template>
  <div class="senior">
    <div class="item">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-Graphics_CustomIc3"></use>
      </svg>
      <span>
        现金购物返积分及瓴里值
        <p>例如实付 100 元，返 50 积分及 50 瓴里值</p>
      </span>
    </div>
    <div class="item">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-Graphics_CustomIc6"></use>
      </svg>
      <span>每月 2 张咖啡券 + 惊喜礼券</span>
    </div>
    <div class="item">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-Graphics_CustomIc9"></use>
      </svg>
      <span>生日惊喜</span>
    </div>
    <div class="item">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-Graphics_CustomIc8"></use>
      </svg>
      <span>臻蓝专享商品</span>
    </div>
    <div class="item">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-Graphics_CustomIc10"></use>
      </svg>
      <span>限量商品优先购买</span>
    </div>
    <div class="item">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-Graphics_CustomIc11"></use>
      </svg>
      <span>专属 Expert</span>
    </div>

    <div class="item">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-Graphics_CustomIc7"></use>
      </svg>
      <span>免费使用体验店享座</span>
    </div>
    <div class="item">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-Graphics_CustomIc1"></use>
      </svg>
      <span>顶级活动特邀资格</span>
    </div>
    <div class="item">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-Graphics_CustomIc2"></use>
      </svg>
      <span>品牌活动优先报名</span>
    </div>
    <div class="item">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-Graphics_CustomIc"></use>
      </svg>
      <span>VIP DAY</span>
    </div>
    <!-- <div class="item ivite"> -->
      <!-- <div class="item-invite">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-Graphics_CustomIc4"></use>
        </svg>
        <span>悦蓝会员邀请卡 X2</span>
      </div> -->
      <!-- <a class="ivited" :href="link">
        <span>去邀请</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-Graphics_CustomIc12"></use>
        </svg>
      </a> -->
    <!-- </div> -->
    <div class="item">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-Graphics_CustomIc5"></use>
      </svg>
      <span>优先客服</span>
    </div>
  </div>
</template>
<script>
import frequent from '../../../../mixins/frequent';
import {parseUrl} from '../../../../utils/business/tools.js';
import {appRoute} from '../../../../utils/business/judge.js';
export default {
  name: 'SeniorMember',
  mixins: [frequent],
  data(){
    return {
      link: ''
    };
  },
  title() {
    return '臻蓝会员';
  },
  meta() {
    return `<meta name="description" content="臻蓝会员">
    <meta name="keywords" content="臻蓝会员">`;
  },
  mounted(){
    if(parseUrl().app === 'a-lanehub'){
      this.link = 'lanehub://myhome/member_invite';
    }else if(parseUrl().app === 'i-lanehub'){
      this.link = 'lanehub://member/member_invite';
    }else{
      this.link = appRoute();
    }
  }
};
</script>
<style lang="scss" scoped>
.senior{
  padding: 0.38rem 0.44rem;
  background-color: white;
  .ivite{
    justify-content: space-between;
    align-items: center;
    .item-invite{
      display: flex;
      align-items: center;
    }
    .ivited{
      font-size:0.28rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(0,114,221,1);
      line-height:0.46rem;
      // display: flex;
      // align-items: center;
      .icon{
        font-size: 0.26rem;
      }
    }
  }
  .item{
    font-size:0.34rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(34,34,34,1);
    line-height:0.46rem;
    display: flex;
    // align-items: center;
    margin-bottom: 0.7rem;
    span{
      margin-left: 0.44rem;
    }
    p{
      margin-top: 0.16rem;
      font-size:0.28rem;
      font-family:PingFangSC-Light;
      font-weight:300;
      color:rgba(119,119,119,1);
      line-height: 1;
    }
  }
  .icon {
    font-size: 0.46rem;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
}
</style>
