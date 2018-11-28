<template>
  <div class="yu-yue-lan">
    <div class="item">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-Graphics_CustomIc3"></use>
      </svg>
      <span>现金购物返 5% 积分</span>
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
          <use xlink:href="#icon-Graphics_CustomIc10"></use>
      </svg>
      <span>限量商品优先购买</span>
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
    <div class="item ivite" @click="intercept">
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-Graphics_CustomIc4"></use>
        </svg>
        <span>亲友邀请卡 X1</span>
      </div>
      <div class="ivited">
        <span>去邀请</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-Graphics_CustomIc12"></use>
        </svg>
      </div>
    </div>
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
export default {
  name: 'YueBlueMember',
  mixins: [frequent],
  data(){
    return {

    };
  },
  title() {
    return '悦蓝会员';
  },
  meta() {
    return `<meta name="description" content="悦蓝会员">
    <meta name="keywords" content="悦蓝会员">`;
  }
};
</script>
<style lang="scss" scoped>
.yu-yue-lan{
  padding: 0.38rem 0.44rem;
  background-color: white;
  .ivite{
    justify-content: space-between;
    .ivited{
      font-size:0.28rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(0,114,221,1);
      line-height:1;
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
    line-height:1;
    display: flex;
    align-items: center;
    margin-bottom: 0.7rem;
    span{
      margin-left: 0.44rem;
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
