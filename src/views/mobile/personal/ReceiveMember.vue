<template>
  <div>
    <!-- <div class="nav">
      <span class="iconfont icon-nav_ic_return" style="font-size: 0.46rem;" @click="goBack"></span>
      <span>瓴里悦蓝 至高礼遇</span>
      <span class="iconfont icon-nav_ic_return" style="font-size: 0.46rem;opacity: 0;"></span>
    </div> -->
    <div class="receive-member">
      <div class="head">
        <img :src="data.user_photo" alt="">
        <span>{{data.user_name}}</span>
      </div>
      <div class="subtitle">
        <p class="p1">{{data.title}}</p>
        <p class="p2">{{data.content}}</p>
      </div>
      <div class="card">
        <img src="../../../../static/mobile/img/h5/members_ic_bg.png" alt="">
        <div class="logo">
          <div class="l-c">
            <span style="color: white; font-size: 0.66rem;" class="iconfont icon-new_user_logo"></span>
            <span style="font-size: 0.34rem; color: white; margin-left: 0.24rem;" class="iconfont icon-footer_ic_logo" ></span>
          </div>
          <div class="l-b">
            悦蓝会员
          </div>
        </div>

        <div class="card-foot">
          <div>
            <span>购物返利</span>
            <div class="img">
              <span style="font-size: 0.44rem;" class="iconfont icon-members_ic_rebate"></span>
            </div>
          </div>
          <div>
            <span>礼券福利</span>
            <div class="img">
              <span style="font-size: 0.44rem;" class="iconfont icon-members_ic_vouchers"></span>
            </div>
          </div>
          <div>
            <span>生日惊喜</span>
            <div class="img">
              <span style="font-size: 0.44rem;" class="iconfont icon-members_ic_surprise"></span>
            </div>
          </div>
          <div>
            <span>优先特权</span>
            <div class="img">
              <span style="font-size: 0.44rem;" class="iconfont icon-members_ic_privilege"></span>
            </div>
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

      <div class="btn" v-if="disable" @click="getMember">领取悦蓝会员</div>
      <div class="btn" v-if="!disable">领取悦蓝会员</div>
      <div class="self">
        <div class="i2">
          <span class="iconfont icon-download_ic_logo"></span>
          <span class="iconfont icon-footer_ic_logo"></span>
          <span class="m-y-d">Make Your Day</span>
        </div>
        <p>
          LANEHUB 是生活方式新零售品牌，整合全球设计资源，在米兰成立设计中心，并与丹麦、日本等全球各地优秀设计师合作，提供生活方式全新选择，创造超越期待的多维度体验。
        </p>
        <div class="store">
          <div class="store_img">
            <img src="../../../../static/mobile/img/personal/img1.png" alt="">
          </div>
          <div class="store_img">
            <img src="../../../../static/mobile/img/personal/member_02.png" alt="">
          </div>
          <div class="store_img">
            <img src="../../../../static/mobile/img/personal/member_03.png" alt="">
          </div>
          <div class="store_img">
            <img src="../../../../static/mobile/img/personal/member_04.png" alt="">
          </div>
          <div class="store_img">
            <img src="../../../../static/mobile/img/personal/member_05.png" alt="">
          </div>
          <div class="store_img">
            <img src="../../../../static/mobile/img/personal/member_06.png" alt="">
          </div>
        </div>
      </div>
      <div class="lanehub">
        <span class="iconfont icon-download_ic_logo"></span><span class="iconfont icon-footer_ic_logo"></span>
        <span class="yuelan">悦蓝礼遇</span>
      </div>
      <div class="yu-yue-lan">
        <div class="item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-Graphics_CustomIc3"></use>
          </svg>
          <span>
            现金购物返积分及瓴里值
            <p>例如实付 100 元，返 50 积分及 50 瓴里值</p>
          </span>
        </div>
        <div class="item">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-Graphics_CustomIc6"></use>
          </svg>
          <span>每月 2 张咖啡券 + 惊喜礼券</span>
        </div>
        <div class="item">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-Graphics_CustomIc9"></use>
          </svg>
          <span>生日惊喜</span>
        </div>
        <div class="item">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-Graphics_CustomIc10"></use>
          </svg>
          <span>限量商品优先购买</span>
        </div>
        <div class="item">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-Graphics_CustomIc2"></use>
          </svg>
          <span>品牌活动优先报名</span>
        </div>
        <div class="item">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-Graphics_CustomIc"></use>
          </svg>
          <span>VIP DAY</span>
        </div>
        <!-- <div class="item ivite">
          <div class="item-ivited">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-Graphics_CustomIc4"></use>
            </svg>
            <span>悦蓝会员邀请卡 X1</span>
          </div>
        </div> -->
        <div class="item">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-Graphics_CustomIc5"></use>
          </svg>
          <span>优先客服</span>
        </div>
      </div>

      <div class="ivited">
        <div class="left">
          <span class="iconfont icon-download_ic_logo"></span>
          <span class="iconfont icon-footer_ic_logo"></span>
          <span class="y-q-g-z">邀请原则</span>
        </div>
        <div class="right" @click="assign('rule_page')">邀请规则</div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';
import receive_member from '../../../store/personal/receive_member.js';

import wechat from '../../../mixins/wechat.js';
import {parseUrl} from '../../../utils/business/tools.js';
import {appRoute} from '../../../utils/business/judge.js';
import frequent from '../../../mixins/frequent';
export default {
  mixins: [frequent, wechat],
  name: 'ReceiveMember',
  data(){
    return {
      show: false,
      time: '',
      tel: '', // ETC 手机号
      identify: '', // ETC 验证码
      num: 86,
      disable: true, // ETC 防抖
      firm_dis: true, // ETC 防抖
      link: ''
    };
  },
  methods: {
    goBack(){
      this.$router.go(-1);
    },
    // 领取会员
    getMember(){
      this.disable = false;
      if(this.tel && this.identify && this.isPoneAvailable(this.tel) && !this.disable){
        window.localStorage.setItem('lh_authinfo', this.test('lh_authinfo'));
        this.$store.dispatch('receive_member/getResult', {
          mobile: this.tel,
          country_num: +JSON.parse(this.test('country')) ? JSON.parse(this.test('country')).countynum : this.num,
          code: +this.identify
        }).then(() => {
          if(this.status === 1){
            window.localStorage.removeItem('lh_authinfo');
            this.$store.dispatch('receive_member/getLogin', {
              mobile: this.tel,
              country_num: +JSON.parse(this.test('country')) ? JSON.parse(this.test('country')).countynum : this.num,
              code: +this.identify
            }).then(() => {
              // this.$router.push({name: 'ResultPage', query: {status: this.status}});
              this.queryAssign('result_page', {status: this.status});
            });
          }else if(this.status === 2 || this.status === 3 || this.status === 4 || this.status === 5 || this.status === 6 || this.status === 7){
            // this.$router.push({name: 'ResultPage', query: {status: this.status}});
            this.queryAssign('result_page', {status: this.status});
          }else{
            this.$toast('请填写正确的验证码', 2000);
          }
        });
      }
      setTimeout(() => {
        this.disable = true;
      }, 1000);
    },
    // 判断是否是手机号
    isPoneAvailable(str) {
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(str)) {
        return false;
      } else {
        return true;
      }
    },
    // 获取验证码 并执行倒计时
    countDown(){
      this.firm_dis = false;
      if(this.tel && this.isPoneAvailable(this.tel) && !this.firm_dis){
        this.$store.dispatch('receive_member/getIdentify', {mobile: +this.tel, country_num: JSON.parse(this.test('country')) ? JSON.parse(this.test('country')).countynum : this.num, forgot: 0});
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
    test(id){
      let reg = new RegExp('(^|&)' + id + '=([^&]*)(&|$)');
      let r = window.location.search.substr(1).match(reg); // ETC search,查询？后面的参数，并匹配正则
      if(r !== null)return  unescape(r[2]); return null;
    }
  },
  title() {
    return '瓴里悦蓝 至高礼遇';
  },
  meta() {
    return `<meta name="description" content="瓴里悦蓝 至高礼遇">
    <meta name="keywords" content="瓴里悦蓝 至高礼遇">`;
  },
  asyncData({store, route}) {
    store.registerModule('receive_member', receive_member);
    return Promise.all([
      store.dispatch('receive_member/getLogo', {})
    ]);
  },
  created() {
    if(process.env.VUE_ENV === 'client') {
      let content_ids = this.test('content_id');
      let lh_authinfos = this.test('lh_authinfo');
      window.localStorage.setItem('lh_authinfo', lh_authinfos);
      if(JSON.parse(this.test('country'))){
        this.num = JSON.parse(this.test('country')).countynum;
      }
      this.$store.registerModule('receive_member', receive_member, {preserveState: true});
      this.$store.dispatch('receive_member/getInvited', {content_id: content_ids, lh_authinfo: lh_authinfos});

      if(parseUrl().app === 'a-lanehub'){
        this.link = 'lanehub://myhome/member_invite';
      }else if(parseUrl().app === 'i-lanehub'){
        this.link = 'lanehub://member/member_invite';
      }else{
        this.link = appRoute();
      }
    }
  },
  mounted(){
    // 微信分享
    if(!this.data) return;
    const link = window.location.href;
    const title = this.data.title;
    const desc = this.data.content;
    const imgUrl = this.logo;
    this.wxInit(link, title, desc, imgUrl);
  },
  destroyed() {
    this.$store.unregisterModule('receive_member', receive_member);
  },
  computed: {
    ...mapState({
      data: (store) => store.receive_member.data,
      status: (store) => store.receive_member.status,
      skip_state: (store) => store.receive_member.skip_state,
      logo: (store) => store.receive_member.logo
    })
  }
};
</script>
<style lang="scss" scoped>
.nav{
  z-index: 99;
  width: 6.9rem;
  background-color: #fff;
  position: fixed;
  top: 0;
  padding: 0.23rem 0.3rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 0.01rem solid #e8e8e8;
  align-items: center;
  span{
    font-size:0.36rem;
    font-family:PingFangSC-Light;
    font-weight:300;
    color:rgba(34,34,34,1);
    line-height:0.36rem;
  }
}
.receive-member{
  padding: 0 0.3rem;
  background-color: white;
  .head{
    width: 100%;
    margin: 0 auto;
    padding-top: 0.4rem;
    // padding-bottom: 0.4rem;
    // margin-top: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:0.32rem;
    font-family:PingFangSC-Light;
    font-weight:300;
    color:rgba(34,34,34,1);
    line-height:1;
    img{
      width: 0.72rem;
      height: 0.72rem;
      border-radius: 0.5rem;
      margin-right: 0.2rem;
    }
  }
  .subtitle{
    text-align: center;
    font-family:PingFangSC-Light;
    font-weight:300;
    margin-top: 0.3rem;
    .p1{
      font-size:0.36rem;
      color:rgba(34,34,34,1);
      line-height:1;
    }
    .p2{
      margin-top: 0.3rem;
      font-size:0.34rem;
      color:rgba(68,68,68,1);
      line-height:1;
    }
  }
  .card{
    margin-top: 0.3rem;
    position: relative;
    .logo{
      position: absolute;
      top: 0.3rem;
      right: 0.3rem;
      .l-c{
        display: flex;
        align-items: center;
      }
      .l-b{
        text-align: right;
        font-size:0.36rem;
        font-family:PingFangSC-Light;
        font-weight:300;
        color:rgba(255,255,255,1);
        line-height:0.44rem;
        margin-top: 0.08rem;
      }
    }
    img{
      width: 100%;
      height: 4.14rem;
      border-radius: 0.08rem;
    }
    .card-foot{
      width: 100%;
      position: absolute;
      bottom: 0.26rem;
      left: 0;
      display: flex;
      justify-content: space-around;
      color: #fff;
      font-size:0.28rem;
      font-family:PingFangSC-Light;
      font-weight:300;
      .img{
        margin-top: 0.14rem;
        display: flex;
        justify-content: center;
      }
    }
  }
  .register{
    text-align: center;
    margin-top: 0.28rem;
    padding: 0 0.5rem;
    div{
      font-size:0.32rem;
      padding: 0.33rem 0.2rem;
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
    margin:0.8rem auto;
    font-weight:300;
    color:rgba(255,255,255,1);
    background:rgba(0,114,221,1);
    border-radius:0.48rem;
  }
  .self{
    .iconfont{
      font-size: 0.32rem;
      margin-right: 0.02rem;
    }
    .i2{
      .m-y-d{
        margin-left: 0.19rem;
      }
    }
    div{
      font-size:0.32rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(34,34,34,1);
      line-height:1;
    }
    p{
      margin-top: 0.3rem;
      font-size:0.28rem;
      font-family:PingFangSC-Light;
      font-weight:300;
      color:rgba(34,34,34,1);
      line-height:0.42rem;
    }
    .store{
      width: 100%;
      margin-top: 0.3rem;
      margin-bottom: 0.87rem;
      display: flex;
      justify-content: flex-start;
      // flex-wrap: nowrap;
      overflow: scroll;
      &::-webkit-scrollbar {display:none}
      .store_img{
        width:5rem;
        height:2.81rem;
        margin-right: 0.3rem;
        img{
          width:5rem;
          height:2.81rem;
          border-radius:0.1rem;
        }
      }
    }
  }
  .ivited{
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.7rem;
    // margin-bottom: 0.33rem;
    .left{
      font-size:0.32rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(34,34,34,1);
      line-height:0.45rem;
      .iconfont{
        font-size: 0.32rem;
        margin-right: 0.02rem;
      }
      .y-q-g-z{
        margin-left: 0.19rem;
      }
    }
    .right{
      font-size:0.28rem;
      font-family:PingFangSC-Light;
      font-weight:300;
      color:rgba(0,114,221,1);
      line-height:0.4rem;
    }
  }
  .lanehub{
    font-size:0.32rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(34,34,34,1);
    line-height:1;
    .iconfont{
      font-size: 0.32rem;
      margin-right: 0.02rem;
    }
    .yuelan{
      margin-left: 0.19rem;
    }
  }
  .yu-yue-lan{
    padding: 0.66rem 0 0.14rem 0;
    .ivite{
      justify-content: space-between;
      // align-items: center;
      .item-ivited{
        display: flex;
        align-items: center;
      }
      .iviteds{
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,114,221,1);
        line-height:1;
        .icon{
          font-size: 0.26rem;
        }
      }
    }
    .item{
      font-size:0.34rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(34,34,34,1);
      line-height:0.46rem;
      display: flex;
      // align-items: center;
      margin-bottom: 0.7rem;
      span{
        margin-left: 0.44rem;
      }
      p{
        margin-top: 0.16rem;
        font-size:0.28rem;
        font-family:PingFangSC-Light;
        font-weight:300;
        color:rgba(119,119,119,1);
        line-height: 1;
      }
    }
    .icon {
      font-size: 0.46rem;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
  }
}
</style>
