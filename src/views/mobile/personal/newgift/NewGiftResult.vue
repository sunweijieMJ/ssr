<template>
  <div class="gift-result">
    <div class="title" v-if="!status">不可领取</div>
    <div class="content" v-if="!status">该礼包仅限首次注册用户领取一次</div>
    <div class="btn2" v-if="!status" @click.stop="intercept">打开 App</div>

    <div class="success" v-if="status">
      <div class="suc-title">
        <p class="title1">领取成功</p>
        <p class="subtitle">优惠券已经放入你的账户中</p>
      </div>
      <div class="coupon-box">
        <div class="more-card" v-for="(cou, index) in gift_info.ticket_list.TicketList" :key="index">
          <div class="top">
            <div class="contents"><span class="val">￥</span>{{cou.fTicketReducePrice}}</div>
          </div>
          <div class="bottom">
            <div class="center">{{cou.sTitle}}</div>
            <div class="decreace">{{cou.sSubTitle}}</div>
          </div>
        </div>
      </div>
      <div class="download" @click.stop="intercept">
        下载 App 去使用
      </div>
    </div>
  </div>
</template>
<script>
import frequent from '../../../../mixins/frequent';
import receive_result from '../../../../store/personal/receive_member.js';
import {mapState} from 'vuex';
export default {
  name: 'NewGiftResult',
  mixins: [frequent],
  data(){
    return {
      status: null
    };
  },
  title() {
    return '瓴里-新人礼包';
  },
  meta() {
    return `<meta name="description" content="Lanehub  瓴里-新人礼包">
    <meta name="keywords" content=" 瓴里-新人礼包">`;
  },
  asyncData({store}) {
    store.registerModule('receive_result', receive_result);
    return Promise.all([
      store.dispatch('receive_result/getNewGift', {})
    ]);
  },
  computed: {
    ...mapState({
      gift_info: (store) => store.receive_result.gift_info
    })
  },
  methods: {

  },
  mounted(){
    this.$store.registerModule('receive_result', receive_result, {preserveState: true});
    this.status = +this.$route.query.status;
  }
};
</script>
<style lang="scss" scoped>
.gift-result{
  text-align: center;
  width: 100%;
  // height: 100vh;
  background-color: #fff;
  .title{
    font-size: 0.44rem;
    font-weight:400;
    color: #222222;
    line-height: 0.62rem;
    padding-top: 0.82rem;
  }
  .content{
    font-size: 0.32rem;
    font-weight:300;
    color: #777777;
    line-height:0.45rem;
    margin-top: 0.18rem;
  }
  .btn{
    width: 5.9rem;
    height: 0.96rem;
    background: #0072DD;
    border-radius: 0.48rem;
    margin: 0.45rem auto;
    text-align: center;
    line-height: 0.96rem;
    font-size: 0.4rem;
    color: #FFFFFF;
  }
  .btn2{
    width: 4.18rem;
    height: 0.96rem;
    background: #0072DD;
    border-radius: 0.48rem;
    margin: 0.45rem auto;
    text-align: center;
    line-height: 0.96rem;
    font-size: 0.4rem;
    color: #FFFFFF;
  }
  .success{
    width: 6.80rem;
    height: 10.69rem;
    background:linear-gradient(180deg,rgba(66,142,213,1) 0%,rgba(0,101,196,1) 100%);
    border-radius:10px;
    margin: 0.4rem auto 0 auto;
    .suc-title{
      width: 100%;
      text-align: center;
      color: #FFFFFF;
      .title1{
        font-size: 0.6rem;
        font-family:PingFangSC-Medium;
        font-weight: 500;
        padding-top: 0.65rem;
      }
      .subtitle{
        font-size: 0.3rem;
        font-weight: 400;
        margin-top: 0.16rem;
      }
    }
    .coupon-box{
      margin: 0.4rem auto ;
      height: 6.5rem;
      width: 6rem;
      overflow: scroll;
      &::-webkit-scrollbar {display:none}
      .more-card{
        margin-bottom: 0.16rem;
        width: 100%;
        height: 1.32rem;
        display: flex;
        justify-content: flex-start;
        background-image: url('../../../../../static/mobile/img/coupon/new_bg1.png');
        background-size: 100% 100%;
        .top {
          text-align: center;
          line-height: 1.32rem;
          width: 1.97rem;
          font-size: 0.6rem;
          font-weight: 500;
          color:#222222;
          font-family:PingFangSC-Medium;
          .contents{
            width: 1.97rem;
            text-align: center;
          }
          .val{
            font-size: 0.4rem;
            line-height: 1;
          }
        }
        .bottom{
          width: 4.03rem;
          text-align: left;
          .center{
            margin-left: 0.25rem;
            margin-top: 0.24rem;
            font-size: 0.36rem;
            font-weight: 400;
            color: #222222;
            line-height: 1;
          }
          .decreace{
            margin-left: 0.25rem;
            margin-top: 0.2rem;
            font-size: 0.28rem;
            font-weight: 300;
            color: #777777;
            line-height: 1;
          }
        }
      }
    }
    .download{
      margin: 0.4rem auto;
      width: 5.4rem;
      height: 0.96rem;
      background: #FFFFFF;
      border-radius: 0.5rem;
      text-align: center;
      line-height: 0.96rem;
      font-size: 0.4rem;
      font-weight: 400;
      color: #0072DD;
    }
  }
  
}
</style>
