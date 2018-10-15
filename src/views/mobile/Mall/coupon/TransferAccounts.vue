<template>
  <div class="transfer-accounts">
    <PublicTitle :pageTitle="'查看范例'" v-if="!(response.__platform === 'app' || isTencent)"></PublicTitle>
    <div class="accounts-content">
      <h3>{{text.title}}</h3>
      <p v-for="(item, index) in text.content" :key="index">
        <span>{{item}}</span>
      </p>
      <p>
        <span>3.请勿多转账或者少转账，</span><i>对应订单编号的金额</i>
      </p>
      <p>
        <i>4.请在 15 天内完成支付，</i><span>公司转账订单款项对账提前为3个工作日（从支付之日算起），15天内（从下单之日算起）如果还未付款并到账，系统将自动取消订单；</span>
      </p>
    </div>
  </div>
</template>
<script>
  import {os} from '../../../../utils/business/judge.js';
  import {parseUrl} from '../../../../utils/business/tools.js';
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
    data() {
      return {
        response: {},
        isTencent: false,
        text: {
          title: '线下银行转账说明：',
          content: [
            '1.汇款时请备注订单编号，用于保证订单及时核销。此编号必须填写正确，请勿增加其他文字说明；',
            '2.订单编号需填写只至电汇凭证【汇款用途】、【附言】等栏内（因不同银行备注不同，最好在所有可填写备注的地方均填写）；'
          ]
        }
      };
    },
    mounted() {
      let that = this;
      that.response = parseUrl();
      that.isTencent = os().isWechat || os().isQQ;
    }
  };
</script>
<style lang="scss" scoped>
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
        &:last-child {
          margin-bottom: none;
        }
        span {
          color: $themeColor;
        }
        i {
          font-weight: 400;
          font-style: normal;
          color: $mallRed;
        }
      }
    }
  }
</style>


