<template>
  <div class="gift-rule-page">
    <PublicTitle :pageTitle="'邀请好友规则'" v-if="!(response.__platform === 'app' || isTencent)"></PublicTitle>
    <div class="gift-box">
      <ul class="c-box">
        <li class="c-li" v-for="(ga, gaindex) in rule_model" :key="gaindex">
          <span class="title">{{ga.title}}</span>
          <ul class="p-box">
            <li class="p-li" v-for="(c, index) in ga.content" :key="index">
              <p class="num">{{c.num}}</p>
              <p>{{c.text}}</p>
            </li>
          </ul>
        </li>
      </ul>
      <div class="label">
        <p>*注: 以上最终解释权归瓴里所有</p>
      </div>
    </div>
  </div>
</template>
<script>
import hidetitle from '../../../../mixins/hidetitle.js';
import {PublicTitle} from '../../../../components/mobile/business';
export default {
  name: 'GiftRulePage',
  components: {PublicTitle},
  mixins: [hidetitle],
  data(){
    return {
      rule_model: [
        {
          title: '奖励规则',
          content: [
            {
              num: '1.',
              text: '每天前 3 次发出好友邀请，邀请者获得 1-10 积 分随机奖励；'
            },
            {
              num: '2.',
              text: '新用户接受邀请注册成功，邀请者获得满 300 减 30 优惠券一张；'
            },
            {
              num: '3.',
              text: '新用户接受邀请注册成功，并且在 7 天内下单 付款成功，订单确认收货 7 天后，邀请者获得 200 积分及满 699 减 100 优惠券一张；'
            },
            {
              num: '4.',
              text: '邀请者每邀请 3 名好友注册成功，获得额外奖 励 200 积分；'
            }
          ]
        },
        {
          title: '使用说明',
          content: [
            {
              num: '1.',
              text: '积分不能提现，不能转赠他人；'
            },
            {
              num: '2.',
              text: '若新用户取消订单、发起退款，退款成功后邀 请者扣除相应积分奖励，若发现恶意刷单或违反 诚信的其他行为，有权缴销邀请奖励及相关订单 并追究其法律责任。'
            }
          ]
        }
      ]
    };
  },
  title(){
    return '邀请好友规则';
  },
  meta(){
    return `<meta name="description" content="Lanehub 邀请好友规则">
    <meta name="keywords" content="邀请好友规则">`;
  }
};
</script>
<style lang="scss" scoped>
.gift-rule-page{
  .gift-box{
    padding: 0.5rem 0.44rem;
    .c-box{
      .c-li{
        &:first-child{
          margin-bottom: 0.8rem;
        }
        .title{
          font-size: 0.36rem;
          font-weight: 400;
          color: #222222;
          line-height: 1;
        }
        .p-box{
          width: 100%;
          .p-li{
            margin-top: 0.3rem;
            display: flex;
            justify-content: flex-start;
            .num{
              margin-right: 0.05rem;
            }
            p{
              font-size: 0.3rem;
              font-weight:300;
              color: #222222;
              line-height: 0.42rem;
            }
          }
        }
      }
    }
    .label{
      margin-top: 0.5rem;
      p{
        font-size: 0.3rem;
        font-weight:300;
        color: #777777;
        line-height: 0.42rem;
      }
    }
  }
}
</style>
