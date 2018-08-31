<template>
  <div class="service">
    <public-title :pageTitle="'服务与常见问题'" v-if="!(response.__platform === 'app' || isTencent)"></public-title>
    <div class="service-nav">
      <section :style="(response.__platform === 'app' || isTencent) ? '' : {top:'0.89rem'}">
        <a href="javascript:;" v-for='(item,index) in navList' :key='index' :class="{active:index === curIndex}" @click='comFun(item,index)'>
          <img :src="item.icon" alt="">
          <span>{{item.text}}</span>
        </a>
      </section>
    </div>
    <div class="service-content">
      <component :is="com"></component>
    </div>
  </div>
</template>
<script>
  import {PublicTitle} from '../../../../components/mobile/business';
  import {SafeGuard, Problem, Regulation} from './serviceinfo/index.js';
  import {os} from '../../../../utils/business/judge.js';
  import {parseUrl} from '../../../../utils/business/tools.js';

  import safeguard from '../../../../../static/mobile/svg/product/custom_ic_service.svg';
  import problem from '../../../../../static/mobile/svg/product/custom_ic_problem.svg';
  import regulation from '../../../../../static/mobile/svg/product/me_ic_integral_gold.svg';

  export default {
    title() {
      return '服务与常见问题';
    },
    meta() {
      return `<meta name="description" content="服务与常见问题">
      <meta name="keywords" content="服务与常见问题">`;
    },
    components: {
      PublicTitle
    },
    data() {
      return {
        response: {},
        isTencent: false,
        com: SafeGuard,
        curIndex: 0,
        navList: [
          {
            icon: safeguard,
            text: '服务保障',
            isCom: SafeGuard
          },
          {
            icon: problem,
            text: '常见问题',
            isCom: Problem
          },
          {
            icon: regulation,
            text: '积分规则',
            isCom: Regulation
          }
        ]
      };
    },
    mounted(){
      let that = this;
      that.response = parseUrl();
      that.isTencent = os().isWechat || os().isQQ;
    },
    methods: {
      comFun(item, index) {
        let that = this;
        that.com = item.isCom;
        that.curIndex = index;
      }
    }
  };
</script>
<style lang="scss" scoped>
 @import '../../../../assets/scss/_base.scss';

  .service {
    width: 100%;
    height: 100%;
    background-color: #fff;
    .service-nav {
      width: 100%;
      height: 0.9rem;
      position: relative;
      background-color: #fff;
      section{
        box-sizing: border-box;
        width: 7.5rem;
        height: 0.9rem;
        position: fixed;
        top: 0rem;
        z-index: 1000;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid#f5f5f5;
        background-color: #fff;
        a {
          box-sizing: border-box;
          width: 1.7rem;
          height: 0.9rem;
          display: flex;
          justify-content: center;
          align-items: center;
          &:last-child{
            img{
              width: 0.34rem;
            }
          }
          img{
            width: 0.3rem;
            margin-right: 0.1rem;
          }
          span {
            font-size: 0.3rem;
            font-weight: 300;
            color: $subColor;
          }
          &.active {
            border-bottom: 2px $darkBlue solid;
            span{
              color: $themeColor;
            }
          }
        }
      }
    }
    .service-content{
      background-color: #fff;
      li{
        margin-bottom: 0.4rem;
        &:last-child{
          margin-bottom: 0;
          p{
            margin-bottom: 0;
          }
        }
        h4{
          font-size: 0.28rem;
          font-weight: 400;
          line-height: 0.28rem;
          letter-spacing: 0.6px;
          color: $themeColor;
          margin-bottom: 0.2rem;
          padding-left: 0.2rem;
          position: relative;
          &:before{
            position: absolute;
            border-radius: 50%;
            left: 0;top: 0.1rem;
            content:"";
            width: 0.06rem;
            height: 0.06rem;
            background-color:#000;
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
    }
  }
</style>


