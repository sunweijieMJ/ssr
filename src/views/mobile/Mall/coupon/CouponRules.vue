<template>
  <div class="coupon-rules">
    <PublicTitle :pageTitle="'优惠券使用规则'" v-if="!(response.__platform === 'app' || isTencent)"></PublicTitle>
    <ul v-for="(item, index) in rules" :key="index">
      <li>
        <h3>{{item.title}}</h3>
        <p v-for="(val, i) in item.content" :key="i">
          <span>{{i + 1}}.</span>
          <span>{{val}}</span>
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
  import hidetitle from '../../../../mixins/hidetitle.js';
  import {PublicTitle} from '../../../../components/mobile/business';

  export default {
    title() {
      return '优惠券使用规则';
    },
    meta() {
      return `<meta name="description" content="优惠券使用规则">
              <meta name="keywords" content="优惠券使用规则">`;
    },
    components: {PublicTitle},
    mixins: [hidetitle],
    data() {
      return {
        rules: [
          {
            title: '优惠券使用规则',
            content: [
              '下单时，优惠券可选择使用或者不使用，使用时系统默认金额最大以及临近过期的优惠券。',
              '单笔订单只可使用一张优惠券，每张优惠券只可使用一次，不可叠加使用。',
              '限定商品的优惠券只限于该商品购买时使用。',
              '优惠券付款时产生的差额不折现不找零不退回。',
              '优惠券与积分可同时使用，优惠券金额与积分的比例为1元=10积分，全积分结算时，如需200积分，使用10元优惠券后（10×10=100积分），实际结算积分为200-100=100积分。现金+积分结算时，优惠券优先减免现金支付金额，再减免支付积分。',
              '优惠券使用后，如订单未完成支付，该优惠券则被冻结，不可以再次使用，需取消订单后，方可正常使用。',
              '请在优惠券有效期内使用，未使用的优惠券过期后将自动作废。',
              '所有可使用以及不可使用的优惠券可在我的优惠券查看。'
            ]
          },
          {
            title: '优惠券退还规则',
            content: [
              '订单“待付款”时，如取消订单或订单自动关闭，退还优惠券至我的卡券。',
              '订单“已支付”时，取消订单不退还优惠券。',
              '订单“已发货”或“待收货”时，取消订单、退货、经由客服取消订单，不退还优惠券。',
              '订单“已签收”时，退货不退还优惠券。'
            ]
          }
        ]
      };
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .coupon-rules {
    background-color: #fff;
    ul {
      padding: 0.3rem;
      li {
        margin-bottom: 0.3rem;
        &:last-child {
          margin-bottom: 0;
        }
        h3 {
          font-size: 0.28rem;
          font-weight: 400;
          line-height: 0.28rem;
          letter-spacing: 0.6px;
          color: $themeColor;
          margin-bottom: 0.3rem;
          position: relative;
          padding-left: 0.15rem;
          &:before{
            position: absolute;
            border-radius: 50%;
            left: 0;top: 0.1rem;
            content:"";
            width: 0.06rem;
            height: 0.06rem;
            background-color:#000;
          }
        }
        p{
          display: flex;
          span {
            font-size: 0.26rem;
            line-height: 0.42rem;
            letter-spacing: 0.6px;
            color: $themeColor;
            &:first-child {
              width: 0.3rem;
            }
            &:last-child {
              flex: 1
            }
          }
        }
      }
    }
  }
</style>


