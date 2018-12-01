<template>
  <div class="transfer-accounts">
    <PublicTitle :pageTitle="'查看范例'" v-if="!(response.__platform === 'app' || isTencent)"></PublicTitle>
    <div v-html="explain" class="accounts-content"></div>
  </div>
</template>
<script>
  import hidetitle from '../../../../mixins/hidetitle.js';
  import {PublicTitle} from '../../../../components/mobile/business';

  export default {
    title() {
      return '查看范例';
    },
    meta() {
      return `<meta name="description" content="查看范例">
              <meta name="keywords" content="查看范例">`;
    },
    components: {PublicTitle},
    mixins: [hidetitle],
    data() {
      return {
        explain: `<h3>线下银行转账说明：</h3>
               <p>1.汇款时请备注订单编号，用于保证订单及时核销。此编号必须填写正确，请勿增加其他文字说明；</p>
               <p>2.订单编号需填写只至电汇凭证【汇款用途】、【附言】等栏内（因不同银行备注不同，最好在所有可填写备注的地方均填写）；</p>
               <p>3.请勿多转账或者少转账，<strong>对应订单编号的金额；</strong></p>
               <p><strong>4.请在 15 天内完成支付，</strong>公司转账订单款项对账提前为3个工作日（从支付之日算起），15天内（从下单之日算起）如果还未付款并到账，系统将自动取消订单。</p>`
      };
    }
  };
</script>
<style lang="scss">
  @import '../../../../assets/scss/_base.scss';

  .transfer-accounts {
    background-color: #fff;
    .accounts-content {
      padding: 0.3rem;
      h3 {
        margin-bottom: 0.24rem;
        font-size: 0.26rem;
        font-weight: 400;
        color: $themeColor;
      }
      p {
        margin-bottom: 0.3rem;
        font-size: 0.26rem;
        color: $themeColor;
        &:last-child {
          margin-bottom: 0;
        }
        strong {
          font-weight: 400;
          font-style: normal;
          color: $mallRed;
        }
      }
    }
  }
</style>


