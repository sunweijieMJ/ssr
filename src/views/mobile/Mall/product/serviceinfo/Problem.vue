<template>
  <div class="problem">
    <ul>
      <li v-for="(item,index) in msg" :key="index">
        <h4>{{item.title}}</h4>
        <p v-for="(val,index) in item.content" :key="index">{{val}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        msg: [
          {
            title: '如何联系我们',
            content: ['热线电话：400-819-0101', '服务时间：10:00-18:00']
          },
          {
            title: '支持哪些渠道付款',
            content: ['瓴里目前支持支付宝、微信两种渠道付款。']
          },
          {
            title: '下单多久发货',
            content: ['下单付款后，24小时内发货。']
          },
          {
            title: '订单信息如何变更',
            content: ['如需取消订单或者变更订单信息，请直接联系客服。']
          },
          {
            title: '退换货如何申请',
            content: ['退换货流程：确认收货-联系客服申请退货-用户寄出货品-联系客服反馈物流信息-仓库验收-退换货完成。']
          },
          {
            title: '退款如何处理',
            content: ['如产生退款，客服将在24小时之内受理，退款将于7-10个工作日退还至用户支付路径。']
          },
          {
            title: '收货需注意事项',
            content: ['请于快递人员在场的情况下开箱验货，并确认商品数量、型号等，如有商品质量问题、运输过程中损坏、漏发错发等情况，可当场拒收；如已签收，请联系客服处理。']
          },
          {
            title: '发票如何开具',
            content: ['如需开具发票，请填写开票信息。依照国家税务总局开票法规，瓴里开具具有法律效应的增值税普通发票，形式为电子发票，开票内容为明细，发票详情将于确认收货后2-5个工作日发至预留电子邮箱。积分兑换礼品不可开具发票，部分积分＋现金购买的订单，发票将开具实付金额部分，如有任何疑问请咨询客服。']
          }
        ]
      };
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .problem{
    padding: 0.4rem 0.3rem;
    li{
      margin-bottom: 0.4rem;
      &:last-child{
        margin-bottom: 0;
        p{
          margin-bottom: 0;
        }
      }
      h4{
        font-size: 0.28rem;
        font-weight: 400;
        line-height: 0.28rem;
        letter-spacing: 0.6px;
        color: $themeColor;
        margin-bottom: 0.2rem;
        padding-left: 0.2rem;
        position: relative;
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
        font-size: 0.26rem;
        font-weight: 300;
        line-height: 0.4rem;
        letter-spacing: 0.6px;
        color: $themeColor;
        margin-bottom: 0.2rem;
      }
    }
  }
</style>

