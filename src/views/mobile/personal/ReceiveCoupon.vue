<template>
  <div class="coupon">
    <div>
      <div class="card">
        <div class="header">
          <img :src="coupon_for.source_image" alt="">
          <span>{{coupon_for.source}}</span>
        </div>
        <div class="discription" v-if="coupon_for">
          <div class="top" v-if="coupon_for.ticket_title">
            <div class="content">{{coupon_for.ticket_title}}</div>
            <div class="center">{{coupon_for.ticket_subtitle}}</div>
          </div>
          <div class="bottom"  v-if="coupon_for.aProps">
            <div class="decreace" v-if="coupon_for.aProps && coupon_for.aProps.type === 'discount' && coupon_for.aProps.product_price_egt">满 {{coupon_for.aProps.product_price_egt}} 可用</div>
            <div class="decreace" v-if="coupon_for.aProps && coupon_for.aProps.type === 'discount' && !coupon_for.aProps.product_price_egt">{{coupon_for.aProps.values}} 折券</div>
            <div class="decreace" v-if="coupon_for.aProps && coupon_for.aProps.type === 'reduce' && coupon_for.aProps.product_price_egt">满 {{coupon_for.aProps.product_price_egt}} 立减 {{coupon_for.aProps.values}}</div>
            <div class="decreace" v-if="coupon_for.aProps && coupon_for.aProps.type === 'reduce' && !coupon_for.aProps.product_price_egt"> 立减 {{coupon_for.aProps.values}} 元</div>
          </div>
        </div>
      </div>
      <div class="register">
        <div class="phone">
          <span @click="querySkip('CountryCode')" class="p-span2">
            <span>+{{num}}</span><span class="iconfont icon-login_ic_down1"></span>
          </span>
          <input type="text" class="s-j-h" placeholder="手机号" v-model="tel">
        </div>
        <div class="phone2">
          <input type="text" class="y-z-m" maxlength="4" placeholder="验证码"  v-model="identify">
          <span class="firm" v-if="!show && firm_dis" @click="countDown">获取验证码</span>
          <span class="firm" v-if="!show && !firm_dis">获取验证码</span>
          <span v-show="show">{{time}}</span>
        </div>
      </div>

      <div class="btn-null" v-if="coupon_for.ticket_status === 2">不可领取</div>
      <div class="btn" v-if="coupon_for.ticket_status !== 2 && disable" @click="getCoupon">立即领取</div>
      <div class="btn" v-if="coupon_for.ticket_status !== 2 && !disable">立即领取</div>
    </div>
    <!-- <div class="null" v-if="view_status === 1">
      <div class="iconfont icon-product_lb_error"></div>
      找不到扫描的内容
    </div> -->
    <!-- <div class="final" v-if="view_status === 2">
      <div>来晚了，该活动已结束</div>
      <div class="btns" @click.stop="intercept">打开 App</div>
    </div> -->
  </div>
  
</template>
<script>
import {mapState} from 'vuex';
import wechat from '../../../mixins/wechat.js';
import frequent from '../../../mixins/frequent';
import receive_coupon from '../../../store/personal/receive_coupon.js';

import coupon_share from '../../../store/personal/receive_member.js';
export default {
  mixins: [frequent, wechat],
  name: 'coupon',
  data(){
    return{
      show: false,
      time: '',
      tel: '', // ETC 手机号
      identify: '', // ETC 验证码
      num: 86,
      firm_dis: true, // ETC 防抖
      disable: true // ETC 防抖
    };
  },
  title() {
    return '领取优惠券';
  },
  meta() {
    return `<meta name="description" content="Lanehub 领取优惠券">
    <meta name="keywords" content="领取优惠券">`;
  },
  asyncData({store, route}) {
    store.registerModule('receive_coupon', receive_coupon);
    store.registerModule('coupon_share', coupon_share);
    return Promise.all([
      store.dispatch('coupon_share/getLogo', {})
    ]);
  },
  destroyed() {
    this.$store.unregisterModule('receive_coupon', receive_coupon);
  },
  computed: {
    ...mapState({
      coupon_for: (store) => store.receive_coupon.coupon_for,
      state: (store) => store.receive_coupon.state,
      result_state: (store) => store.receive_coupon.result_state,
      logo: (store) => store.coupon_share.logo
      // view_status: (store) => store.receive_coupon.view_status
    })
  },
  created(){
    if(process.env.VUE_ENV === 'client') {
      // let tickets = this.test('ticket');
      if(JSON.parse(this.test('country'))){
        this.num = JSON.parse(this.test('country')).countynum;
      }
      this.$store.registerModule('receive_coupon', receive_coupon, {preserveState: true});
      this.$store.registerModule('coupon_share', coupon_share, {preserveState: true});
      this.$store.dispatch('receive_coupon/getCoupon', {ticket: this.test('ticket')});
      
    }
  },
  mounted(){
    // 微信分享
    if(!this.data) return;
    const link = window.location.href;
    const title = this.coupon_for.source;
    const desc = this.coupon_for.ticket_title;
    const imgUrl = this.logo;
    this.wxInit(link, title, desc, imgUrl);
  },
  methods: {
    // 判断是否是手机号
    isPoneAvailable(str) {
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(str)) {
        return false;
      } else {
        return true;
      }
    },
    test(id){
      let reg = new RegExp('(^|&)' + id + '=([^&]*)(&|$)');
      let r = window.location.search.substr(1).match(reg); // ETC search,查询？后面的参数，并匹配正则
      if(r !== null)return  unescape(r[2]); return null;
    },
    countDown(){
      this.firm_dis = false;
      if(this.tel && this.isPoneAvailable(this.tel) && !this.firm_dis){
        this.$store.dispatch('receive_coupon/getIdentify', {mobile: +this.tel, country_num: JSON.parse(this.test('country')) ? JSON.parse(this.test('country')).countynum : this.num, forgot: 0});
        let time = 60;
        let timeStop = setInterval(() => {
          time--;
          if (time > 0) {
            this.show = true;
            this.time = '重新发送' + ' ' + time + ' ' + 's ';
          }else{
            time = 60; // ETC当减到0时赋值为60
            this.show = false;
            clearInterval(timeStop);// ETC 清除定时器
          }
        }, 1000);
      }else{
        this.$toast('请填写正确的手机号', 2000);
      }
      setTimeout(() => {
        this.firm_dis = true;
      }, 1000);
    },
    // 立即领取
    getCoupon(){
      this.disable = false;
      if(this.tel && this.identify && this.isPoneAvailable(this.tel) && !this.disable){
        this.$store.dispatch('receive_coupon/getCouponResult', {
          ticket: this.test('ticket'),
          mobile: this.tel,
          country_num: +JSON.parse(this.test('country')) ? JSON.parse(this.test('country')).countynum : this.num,
          code: +this.identify
        }).then(() => {
          if(this.state === 1){
            this.$toast('找不到您扫描的内容', 1000);
          }else if(this.state === 5){
            this.$toast('验证码不正确或验证码已超时', 1000);
          }else{
            this.queryAssign('coupon_result', {status: this.state ? this.state : '', result_state: this.result_state});
            // this.$router.push({name: 'CouponResult', query: {status: this.state ? this.state : '', result_state: this.result_state}});
          }
        }).catch(() => {
          this.$toast('请填写正确的验证码', 1000);
        });
      }else{
        this.$toast('请填写手机号或验证码', 1000);
      }
      setTimeout(() => {
        this.disable = true;
      }, 1000);
    }
  }
};
</script>
<style lang="scss" scoped>
.coupon{
  padding: 0.4rem 0.3rem;
  background-color: white;
  .card{
    width: 100%;
    height: 5.4rem;
    background:linear-gradient(180deg,rgba(66,142,213,1) 0%,rgba(0,101,196,1) 100%);
    border-radius:10px;
    text-align: center;
    .header{
      padding-top: 0.7rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size:0.32rem;
      font-family:PingFangSC-Light;
      font-weight:300;
      color:rgba(255,255,255,1);
      img{
        border-radius: 50px;
        width: 0.56rem;
        height: 0.56rem;
        border: 0.01rem solid #e8e8e8;
        box-sizing: border-box;
      }
      span{
        margin-left: 0.2rem;
      }
    }
    .discription{
      width: 4.8rem;
      height: 2.4rem;
      border-radius:10px;
      margin: 0.64rem auto;
      text-align: center;
      .top {
        background-image: url('../../../../static/mobile/img/coupon/coupon_bg1.png');
        background-size: 100% 100%;
        padding-bottom: 0.21rem;
      }
      .bottom{
        background-image: url('../../../../static/mobile/img/coupon/coupon_bg2.png');
        background-size: 100% 100%;
        padding: 0.3rem 0 0.22rem 0;
      }
      div{
        line-height: 1;
        font-size:0.28rem;
        font-family:PingFangSC-Light;
        font-weight:300;
        color:rgba(34,34,34,1);
        line-height:0.28rem;
      }
      .content{
        font-size:0.5rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(34,34,34,1);
        line-height:0.7rem;
        padding-top: 0.3rem;
      }
      .center{
        margin-top: 0.1rem;
      }
    }
  }
  .register{
    text-align: center;
    margin-top: 0.68rem;
    padding: 0 0.5rem;
    div{
      font-size:0.32rem;
      padding: 0.32rem 0.2rem;
      &:nth-child(2){
        padding-top: 0.5rem;
      }
      .firm{
        font-size:0.3rem;
        font-family:PingFangSC-Light;
        font-weight:300;
        color:#0072dd;
        // margin-right: 0.2rem;
      }
      input{
        // padding: 0 0.2rem;
        font-size: 0.32rem;
        border: none;
        font-family:PingFangSC-Light;
        font-weight:300;
        color: #222;
      }
      .y-z-m{
        width: 2.5rem;
      }
      input::-webkit-input-placeholder {
        font-size: 0.32rem;
        color: #b6b6b6;
      }
    }
    .phone{
      display: flex;
      display: -webkit-flex;
      justify-content: flex-start;
      border-bottom:0.01rem solid #e8e8e8;
      align-items: center;
      -webkit-align-items: center;
      .s-j-h{
        padding: 0 0.2rem;
      }
      .p-span2{
        display: flex;
        // display: inline-block;
        color: #222;
        align-items: center;
        .iconfont{
          font-size: 0.1rem;
          position: relative;
          bottom: -0.04rem;
        }
      }
    }
    .phone2{
      border-bottom:0.01rem solid #e8e8e8;
      align-items: center;
      -webkit-align-items: center;
      display: -webkit-flex;
      display: flex;
      justify-content: space-between;
    }
  }
  .btn{
    font-size: 0.4rem;
    line-height: 1;
    width: 5.9rem;
    padding: 0.28rem 0;
    text-align: center;
    margin:0.80rem auto;
    font-weight:300;
    color:rgba(255,255,255,1);
    background:rgba(0,114,221,1);
    border-radius:0.48rem;
  }
  .btn-null{
    font-size: 0.4rem;
    line-height: 1;
    width: 5.9rem;
    padding: 0.28rem 0;
    text-align: center;
    margin:0.80rem auto;
    font-weight:300;
    color:rgba(255,255,255,1);
    background:#ccc;
    border-radius:0.48rem;
  }
  .final{
    width: 100%;
    text-align: center;
    margin-top: 0.8rem;
    div{
      font-size:0.44rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(34,34,34,1);
      line-height:1;
    }
    .btns{
      margin: 0.4rem auto;
      width:4.18rem;
      height:0.96rem;
      background:rgba(0,114,221,1);
      border-radius:48px;
      text-align: center;
      line-height: 0.96rem;
      font-size:0.4rem;
      font-family:PingFangSC-Light;
      font-weight:300;
      color:rgba(255,255,255,1);
    }
  }
}
.null{
  width: 100%;
  text-align: center;
  font-size:0.32rem;
  font-family:PingFangSC-Light;
  color:rgba(68,68,68,1);
  .iconfont{
    margin-top: 0.92rem;
    font-size:1.6rem;
    color: #ccc;
    margin-bottom: 0.3rem;
  }
}

</style>
