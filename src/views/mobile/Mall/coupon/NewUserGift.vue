<template>
  <div class="user-gift">
    <public-title :pageTitle="'瓴里-新用户礼包'" v-if="!(response.__platform === 'app' || isTencent)"></public-title>
    <h2><i class="iconfont icon-nav_ic_logo"></i> 新手礼包</h2>
    <div class="gift-price">
      <i class="iconfont icon-new_user_logo"></i>
      <p>
        <i>¥</i><span>1000</span>
      </p>
      <a :href="response.app === 'i-lanehub' ? 'lanehub://receive_newUserGift' : response.app === 'a-lanehub' ? 'lanehub://myhome/phone_login' : 'javascript:;'" @click="intercept">立即领取</a>
    </div>
    <ul class="explain">
      <h3>新用户礼包满减券使用说明：</h3>
      <li v-for="(item, index) in explain" :key="index">{{index+1 + '、' + item}}</li>
    </ul>
  </div>
</template>
<script>
  import {PublicTitle} from '../../../../components/mobile/business';
  import frequent from '../../../../mixins/frequent.js';
  import {os} from '../../../../utils/business/judge.js';
  import {parseUrl} from '../../../../utils/business/tools.js';

  export default {
    title() {
      return '瓴里-新用户礼包';
    },
    meta() {
      return `<meta name="description" content="Lanehub 新用户礼包">
      <meta name="keywords" content="新用户礼包">`;
    },
    components: {PublicTitle},
    mixins: [frequent],
    data() {
      return {
        response: {},
        isTencent: false,
        explain: [
          '该礼包只限首次注册瓴里账号用户领取，已注册用户不可领取。',
          '满减券不可以和其他优惠券同时使用，一个订单最多只能使用一张满减券。',
          '系统会自动选择优惠力度最大的优惠券，你也可以选择要使用哪张券。',
          '满减券自发放日起30天内有效。',
          '如通过不正当手段参与此活动，我司有权利收回相应优惠券。',
          '瓴里对发行的优惠券拥有最终解释权。'
        ]
      };
    },
    mounted() {
      this.response = parseUrl();
      this.isTencent = os().isWechat || os().isQQ;
    }
  };
</script>
<style lang="scss" scoped>
  .user-gift {
    padding: 1.1rem 0 0.5rem;
    background-size: cover;
    background-image: url('../../../../../static/mobile/img/new_user_bg.png');
    h2 {
      margin-bottom: 1.1rem;
      font-size: 0.5rem;
      font-weight: 500;
      line-height: 0.5rem;
      color: #fff;
      text-align: center;
      .icon-nav_ic_logo {
        font-size: 0.44rem;
      }
    }
    .gift-price {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .icon-new_user_logo {
        margin-bottom: 0.28rem;
        font-size: 1.72rem;
        color: #fff;
      }
      p {
        font-weight: 500;
        line-height: 1.68rem;
        color: #fff;
        i {
          font-size: 0.5rem;
          font-style: normal;
        }
        span {
          font-size: 1.2rem;
        }
      }
      a {
        width: 5rem;
        height: 1.1rem;
        border-radius: 0.58rem;
        background-color: #e7533f;
        font-size: 0.4rem;
        font-weight: 500;
        line-height: 1.1rem;
        letter-spacing: 2px;
        text-align: center;
        color: #fff;
      }
    }
    .explain {
      width: 6rem;
      margin: auto;
      h3 {
        margin: 0.7rem 0;
        font-size: 0.32rem;
        font-weight: 300;
        line-height: 0.32rem;
        color: #fff;
      }
      li {
        font-size: 0.3rem;
        line-height: 0.45rem;
        color: #fff;
      }
    }
  }
</style>

