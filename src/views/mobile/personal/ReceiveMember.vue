<template>
  <div>
    <div class="nav">
      <span class="iconfont icon-nav_ic_return" style="font-size: 0.46rem;" @click="goBack"></span>
      <span>瓴里悦蓝 至高礼遇</span>
      <span class="iconfont icon-nav_ic_return" style="font-size: 0.46rem;opacity: 0;"></span>
    </div>
    <div class="receive-member">
      <div class="head">
        <img :src="data.headImg" alt="">
        <span>{{data.member_name}}</span>
      </div>
      <div class="subtitle">
        <p class="p1">{{data.content}}</p>
        <p class="p2">{{data.con2}}</p>
      </div>
      <div class="card">
        <img :src="data.headImg" alt="">
        <div class="card-foot">
          <div v-for="(a, index) in 4" :key="index">
            <span>购物返利</span>
            <div class="img">
              <img :src="data.icon" alt="">
            </div>
          </div>
        </div>
      </div>

      <div class="register">
        <div class="phone">
          <span>
            <span>+86</span><span></span>
          </span>
          <input type="text" placeholder="手机号">
        </div>
        <div>
          <input type="text" placeholder="验证码">
          <span class="firm" v-if="!show" @click="countDown">获取验证</span>
          <span v-show="show">{{time}}</span>
        </div>
      </div>

      <div class="btn" @click="assign('result_page')">领取悦蓝会员</div>
      <div class="self">
        <div>{{data.title1}}</div>
        <p>
          {{data.p1}}
        </p>
        <div class="store">
          <img v-for="(a, mindex) in 4" :key="mindex" :src="data.icon" alt="">
        </div>
      </div>
      <div class="lanehub">
        <span>瓴里LANEHUB </span><span>悦蓝礼遇</span>
      </div>
      <div class="yu-yue-lan">
        <div class="item">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-Graphics_CustomIc3"></use>
          </svg>
          <span>现金购物返 5% 积分</span>
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
        <div class="item ivite">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-Graphics_CustomIc4"></use>
            </svg>
            <span>亲友邀请卡 X1</span>
          </div>
          <div class="iviteds">
            <span>去邀请</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-Graphics_CustomIc12"></use>
            </svg>
          </div>
        </div>
        <div class="item">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-Graphics_CustomIc5"></use>
          </svg>
          <span>优先客服</span>
        </div>
      </div>

      <div class="ivited">
        <div class="left">瓴里LANHUB 邀请原则</div>
        <div class="right" @click="assign('rule_page')">查看规则</div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';
import receive_member from '../../../store/personal/receive_member.js';

import frequent from '../../../mixins/frequent';
export default {
  mixins: [frequent],
  name: 'ReceiveMember',
  data(){
    return {
      show: false,
      time: ''
    };
  },
  methods: {
    goBack(){
      this.$router.go(-1);
    },
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
    }
  },
  title() {
    return '瓴里悦蓝 至高礼遇';
  },
  meta() {
    return `<meta name="description" content="瓴里悦蓝 至高礼遇">
    <meta name="keywords" content="瓴里悦蓝 至高礼遇">`;
  },
  asyncData({store}) {
    store.registerModule('receive_member', receive_member);
  },
  mounted() {
    this.$store.registerModule('receive_member', receive_member, {preserveState: true});
  },
  destroyed() {
    this.$store.unregisterModule('receive_member', receive_member);
  },
  computed: {
    ...mapState({
      data: (store) => store.receive_member.data
    })
  }
};
</script>
<style lang="scss" scoped>
.nav{
  z-index: 99;
  width: 100%;
  background-color: #fff;
  position: fixed;
  top: 0;
  padding: 0.23rem 0.3rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e8e8e8;
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
  .head{
    width: 100%;
    margin: 0.4rem auto;
    margin-top: 1.28rem;
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
      margin-top: 0.24rem;
      font-size:0.34rem;
      color:rgba(68,68,68,1);
      line-height:1;
    }
  }
  .card{
    margin-top: 0.3rem;
    position: relative;
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
        margin-top: 0.35rem;
        display: flex;
        justify-content: center;
      } 
      img{
        width: 0.36rem;
        height: 0.26rem;
        margin: auto;
      }
    }
  }
  .register{
    text-align: center;
    margin-top: 0.28rem;
    padding: 0 0.5rem;
    div{
      align-items: center;
      padding: 0 0.09rem;
      display: flex;
      font-size:0.32rem;
      justify-content: space-between;
      .firm{
        font-size:0.3rem;
        font-family:PingFangSC-Light;
        font-weight:300;
        color:rgba(25,112,206,1);
        margin-right: 0.2rem;
      }
      input{
        padding: 0.32rem 0.2rem;
        font-size: 0.32rem;
        line-height: 1;
        border: none;
        font-family:PingFangSC-Light;
        font-weight:300;
        color:rgba(182,182,182,1);
      }
      input::-webkit-input-placeholder {
        font-size: 0.32rem;
      }
    }
    .phone{
      display: flex;
      justify-content: flex-start;
      border-bottom:1px solid #e8e8e8; 
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
      overflow: scroll;
      &::-webkit-scrollbar {display:none}
      img{
        width:5rem;
        height:2.81rem;
        border-radius:0.1rem;
        margin-right: 0.3rem;
      }
    }
  }
  .ivited{
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.33rem;
    .left{
      font-size:0.32rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(34,34,34,1);
      line-height:0.45rem;
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
  }
  .yu-yue-lan{
    padding: 0.66rem 0 0.14rem 0;
    .ivite{
      justify-content: space-between;
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
      line-height:1;
      display: flex;
      align-items: center;
      margin-bottom: 0.7rem;
      span{
        margin-left: 0.44rem;
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
