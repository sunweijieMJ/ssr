<template>
  <div class="integral-rules">
    <ul>
      <li v-for="(val,index) in msg" :key="index">
        <p>{{val}}</p>
      </li>
    </ul>
    <section>
      <p>在法律允许范围内瓴里具有本须知规则的最终解释权。</p>
    </section>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        msg: [
          '1.在瓴里商城完成商品购买，并确认收货，系统将根据用户该笔订单实付金额作为基准进行积分奖励，其中小数点后的积分向上取整。积分奖励将在订单完成后2-5个工作日内完成；',
          '2.在订单完成之前，进行取消订单或者退货、退款等原因导致订单未完成，该笔订单不发放积分；',
          '3.在商品订单完成后，用户进行退货，在退货流程发起后24小时内将对该笔订单原奖励的积分进行扣除，如用户当前账户内无积分，则将进行预扣处理，当用户重新获得积分时，优先对需补足积分进行扣除；',
          '4.礼品兑换等未发生实际金额消费的订单，不进行积分奖励；'
        ]
      };
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .integral-rules{
    padding: 0.4rem 0.3rem;
    li{
      margin-bottom: 0.4rem;
      &:last-child{
        margin-bottom: 0;
        p{
          margin-bottom: 0;
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
    section{
      padding-top: 0.4rem;
      p{
        font-size: 0.26rem;
        line-height: 0.4rem;
        letter-spacing: 0.6px;
        color: $themeColor;
        text-align: center;
      }
    }
  }
</style>

