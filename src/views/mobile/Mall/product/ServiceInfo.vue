<template>
  <div class="service">
    <public-title :pageTitle="'专业服务'" v-if="!(response.__platform === 'app' || isTencent)"></public-title>
    <div class="service-nav">
      <section :style="(response.__platform === 'app' || isTencent) ? '' : {top:'0.89rem'}">
        <a href="javascript:;" v-for='(item,index) in navList' :key='index' :class="{active:index === current_index}" @click="querySkip('ServiceInfo', {index})">{{item.text}}</a>
      </section>
    </div>
    <div class="service-content">
      <component :is="com"></component>
    </div>
  </div>
</template>
<script>
  import {os} from '../../../../utils/business/judge.js';
  import {parseUrl} from '../../../../utils/business/tools.js';
  import frequent from '../../../../mixins/frequent.js';
  import {PublicTitle} from '../../../../components/mobile/business';
  import {Furniture, Household} from './serviceinfo/index.js';

  export default {
    title() {
      return '专业服务';
    },
    meta() {
      return `<meta name="description" content="专业服务">
      <meta name="keywords" content="专业服务">`;
    },
    components: {
      PublicTitle
    },
    mixins: [frequent],
    data() {
      return {
        response: {},
        isTencent: false,
        com: Household,
        current_index: '',
        navList: [
          {
            text: '家居',
            isCom: Household
          },
          {
            text: '家具',
            isCom: Furniture
          }
        ]
      };
    },
    mounted(){
      let that = this;
      that.response = parseUrl();
      that.isTencent = os().isWechat || os().isQQ;
      that.current_index = +that.response.index;
      that.com = +that.response.index === 1 ? Furniture : Household;
    },
    watch: {
      $route(cur) {
        this.current_index = cur.query.index;
      },
      current_index(cur) {
        this.com = cur === 1 ? Furniture : Household;
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
        border-bottom: 1px solid $borderColor;
        background-color: #fff;
        a {
          box-sizing: border-box;
          width: 1rem;
          height: 0.9rem;
          display: flex;
          justify-content: center;
          line-height: 0.9rem;
          font-size: 0.3rem;
          color: $subColor;
          &.active {
            border-bottom: 2px $darkBlue solid;
            span{
              color: $themeColor;
            }
          }
        }
      }
    }
  }
</style>

