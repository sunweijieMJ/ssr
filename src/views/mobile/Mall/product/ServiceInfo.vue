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
  import frequent from '../../../../mixins/frequent.js';
  import hidetitle from '../../../../mixins/hidetitle.js';
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
    components: {PublicTitle},
    mixins: [frequent, hidetitle],
    data() {
      return {
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
          height: 0.9rem;
          display: flex;
          justify-content: center;
          line-height: 0.9rem;
          font-size: 0.36rem;
          color: $subColor;
          &.active {
            color: $themeColor;
            border-bottom: 0.03rem $darkBlue solid;
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  @import '../../../../assets/scss/_base.scss';

  .service .service-content {
    padding: 0.4rem 0.3rem;
    ul {
      li {
        font-size: 0.3rem;
        margin-bottom: 0.4rem;
        &:last-child{
          margin-bottom: 0;
          p{
            margin-bottom: 0;
          }
        }
      }
      .notice>li {
        padding-left: 0.2rem;
        margin-bottom: 0.1rem;
      }
      .explain {
        padding: 0;
        margin: 0;
        font-size: 0.28rem;
        color: $subColor;
      }
      h3 {
        font-size: 0.32rem;
        font-weight: 400;
        line-height: 100%;
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
      h4, h5 {
        font-size: 0.3rem;
        font-weight: 300;
      }
      p {
        padding-left: 0.2rem;
        font-size: 0.3rem;
      }
      h4, h5, p {
        line-height: 150%;
        color: $themeColor;
        margin-bottom: 0.2rem;
      }
    }
    table {
      margin: 0.2rem 0;
      border-collapse:collapse;
      tr, td{
        border-spacing: 0;
        border-collapse: collapse;
        table-layout: fixed;
        border: 1px solid#999999;
      }
      td{
        width: 2rem;
        padding: 0.15rem;
        font-size: 0.2rem;
        letter-spacing: 0.6px;
        color: $themeColor;
      }
    }
  }
</style>


