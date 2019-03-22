<template>
  <div class="new-gift">
    <div class="login-get">
      <!-- 券信息 -->
      <div class="card">
        <div class="logo">
          <img :src="gift_info.userPhoto" alt="">
          <span>{{gift_info.userName}} 送你</span>
        </div>
        <span class="subtitle">新人礼包</span>
        <div class="discription">
          <div class="top">
            <div class="content"><span>￥</span>{{gift_info.money}} 新人礼包</div>
            <div class="center">送给初遇的你</div>
          </div>
          <div class="bottom">
            <div class="decreace">全场通用</div>
          </div>
        </div>
      </div>
      <!-- 注册 -->
      <div class="register" v-if="app_type">
        <div class="phone">
          <span class="p-span2" @click="querySkip('CountryCode')">
            <span>+{{country_num}}</span><span class="iconfont icon-login_ic_down1"></span>
          </span>
          <input type="text" class="s-j-h" placeholder="手机号" v-model="tel">
        </div>
        <div class="phone2">
          <input type="text" class="y-z-m" maxlength="4" placeholder="验证码"  v-model="identify">
          <span class="firm" v-if="!show && !confir_state" @click="getConfirm">获取验证码</span>
          <span class="firm" v-if="!show && confir_state">获取验证码</span>
          <span v-show="show">{{time}}</span>
        </div>
      </div>
      <div class="btn" v-if="!debouce_state && gift_info.IsActiveOver" @click="getNewGift">立即领取</div>
      <div class="btn" v-if="debouce_state && gift_info.IsActiveOver">立即领取</div>
      <div class="no-btn" v-if="!gift_info.IsActiveOver">不可领取</div>
    </div>
    <HotPro></HotPro>
    <LaneDay></LaneDay>
    <UseConstruct></UseConstruct>
  </div>
</template>
<script>
import HotPro from './newgift/HotPro';
import LaneDay from './newgift/LaneDay';
import UseConstruct from './newgift/UseConstruct';
import {mapState} from 'vuex';
import receive_gift from '../../../store/personal/receive_member.js';
import wechat from '../../../mixins/wechat.js';
import frequent from '../../../mixins/frequent';
import {parseUrl} from '../../../utils/business/tools.js';
import UserActions from '../../../utils/business/actions.js';

export default {
  name: 'NewGift',
  mixins: [wechat, frequent],
  components: {
    HotPro, LaneDay, UseConstruct
  },
  data(){
    return {
      tel: '', // ETC 手机号
      identify: '', // ETC 验证码
      show: false,
      time: '',
      country_num: 86,
      app_type: null, // ETC app类型
      confir_state: false, // ETC 获取验证码防点击处理
      debouce_state: false // ETC 防领取点击处理
    };
  },
  title() {
    return ' 瓴里-新人礼包';
  },
  meta() {
    return `<meta name="description" content="Lanehub  瓴里-新人礼包">
    <meta name="keywords" content=" 瓴里-新人礼包">`;
  },
  asyncData({store, route}) {
    store.registerModule('receive_gift', receive_gift);
    return Promise.all([
      store.dispatch('receive_gift/getLogo', {}),
      // store.dispatch('receive_gift/getNewGift', {})
    ]);
  },
  computed: {
    ...mapState({
      logo: (store) => store.receive_gift.logo,
      gift_info: (store) => store.receive_gift.gift_info,
      gift_message: (store) => store.receive_gift.gift_message
    })
  },
  methods: {
    // url解析
    test(id){
      let reg = new RegExp('(^|&)' + id + '=([^&]*)(&|$)');
      let r = window.location.search.substr(1).match(reg); // ETC search,查询？后面的参数，并匹配正则
      if(r !== null)return  unescape(r[2]); return null;
    },
    // 计时器
    countDown(){
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
    },
    // 获取验证码
    getConfirm(){
      this.confir_state = true;
      if(this.tel && this.isPoneAvailable(this.tel) && this.confir_state){
        // 获取验证码
        this.$store.dispatch('receive_gift/getIdentify', {
          mobile: +this.tel,
          country_num: JSON.parse(this.test('country')) ? JSON.parse(this.test('country')).countynum : this.country_num,
          forgot: 0
        }).then(() => {
          UserActions().action(190, 'click', 'NewGift', {template_num: 1});
        });
        this.countDown();
      }else{
        this.$toast('请填写正确的手机号', 1000);
      }
      setTimeout(() => {
        this.confir_state = false;
      }, 2000);
    },
    // 领取新人礼包
    getNewGift(){
      if(parseUrl().__platform && parseUrl().__platform === 'app'){
        if(parseUrl().app === 'i-lanehub'){
          window.webkit.messageHandlers.receiveGiftCoupon.postMessage({});
        }else if(parseUrl().app === 'a-lanehub'){
          window.lanehub.receiveFresherGift();
        }
      }else{
        this.debouce_state = true;
        if(this.tel && this.identify && this.debouce_state){
          this.$store.dispatch('receive_gift/getNewGiftMessage', {
            params: {
              country_num: JSON.parse(this.test('country')) ? JSON.parse(this.test('country')).countynum : this.country_num,
              code: this.identify,
              mobile: this.tel
            },
            query: {
              inviter: this.test('user_identify')
            }
          }).then(() => {
            this.queryAssign('new_gift_result', {status: this.gift_message});
            UserActions().action(191, 'click', 'NewGift', {template_num: 1});
          });
        }
        setTimeout(() => {
          this.debouce_state = false;
        }, 2000);
      }
    },
    // 手机号验证
    isPoneAvailable(str) {
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(str)) {
        return false;
      } else {
        return true;
      }
    }
  },
  destroyed() {
    this.$store.unregisterModule('receive_gift', receive_gift);
  },
  mounted(){
    if(parseUrl().__platform && parseUrl().__platform === 'app'){
      this.app_type = false;
    }else{
      this.app_type = true;
    }
    if(JSON.parse(this.test('country'))){
      this.country_num = JSON.parse(this.test('country')).countynum;
    }
    this.$store.registerModule('receive_gift', receive_gift, {preserveState: true});
    this.$store.dispatch('receive_gift/getNewGift', {user_identify: this.test('user_identify') ? encodeURIComponent(this.test('user_identify')) : ''});
    // 微信分享
    const link = window.location.href;
    const title = '瓴里-新人礼包';
    const desc = '一起创造愉悦的生活方式';
    const imgUrl = this.logo;
    this.wxInit(link, title, desc, imgUrl);
  }
};
</script>
<style lang="scss" scoped>
.new-gift{
  background-color: #fff;
  .login-get{
    padding: 0.4rem 0.3rem 0.2rem 0.3rem;
    .card{
      width: 6.9rem;
      height: 6.07rem;
      background:linear-gradient(180deg,rgba(66,142,213,1) 0%,rgba(0,101,196,1) 100%);
      border-radius:0.1rem;
      text-align: center;
      margin-bottom: 0.68rem;
      .logo{
        color: #FFFFFF;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 0.7rem;
        margin-bottom: 0.3rem;
        font-size: 0.36rem;
        img{
          width: 0.56rem;
          height: 0.56rem;
          border-radius: 50px;
          margin-right: 0.2rem;
        }
      }
      .subtitle{
        font-size:0.6rem;
        font-weight:500;
        color:#FFFFFF;
        line-height: 1;
      }
      .discription{
        width: 4.8rem;
        height: 2.4rem;
        border-radius:10px;
        margin: 0.54rem auto;
        text-align: center;
        .top {
          background-image: url('../../../../static/mobile/img/coupon/coupon_bg1.png');
          background-size: 100% 100%;
          padding-bottom: 0.21rem;
        }
        .bottom{
          background-image: url('../../../../static/mobile/img/coupon/coupon_bg2.png');
          background-size: 100% 100%;
          padding: 0.25rem 0 0.27rem 0;
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
          span{
            font-size: 0.28rem;
            line-height: 1;
          }
        }
        .center{
          margin-top: 0.1rem;
        }
      }
    }
    .register{
      text-align: center;
      // margin-top: 0.68rem;
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
    .btn,
    .no-btn{
      font-size: 0.4rem;
      line-height: 1;
      width: 5.9rem;
      padding: 0.28rem 0;
      text-align: center;
      margin: 0.8rem auto;
      font-weight:300;
      color: #FFFFFF;
      border-radius:0.48rem;
    }
    .btn{
      background: #0072DD;
    }
    .no-btn{
      background-color: #ccc;
    }
  }
}
</style>
