<template>
  <div class="life-style">
    <div class="menu-header">
      <h1>
        <i v-if="!type" @click.stop="assign('life/choiceness')" class="iconfont icon-download_ic_logo"></i>
        <span v-if="type === 1" @click.stop="assign('mall')">瓴里商城</span>
        <span v-if="type === 2" @click.stop="queryAssign('store_detail', {store_id: 2})">瓴里体验店</span>
      </h1>
      <div>
        <a href="javascript:;" @click.stop="intercept">打开 App</a>
        <i :class="'iconfont ' + (navpopup ? 'icon-download_ic_close' : 'icon-download_ic_menu')" @click.stop="navpopup = !navpopup"></i>
      </div>
    </div>
    <mt-popup v-model="navpopup" position="top">
      <div class="menu-nav">
        <a href="javascript:;" v-for="(item,index) in menu" :key="index" @click="skip(item.path)">
          <i :class="'iconfont ' + item.icon"></i>
          <span>{{item.name}}</span>
        </a>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import frequent from '../../../mixins/frequent.js';

  export default {
    props: ['type'],
    mixins: [frequent],
    data(){
      return {
        menu: [
          {
            name: '首页',
            icon: 'icon-download_ic_home',
            path: 'life/choiceness'
          },
          {
            name: '关于瓴里',
            icon: 'icon-download_ic_bout-us',
            path: 'Description/about_us'
          },
          {
            name: '瓴里产品',
            icon: 'icon-download_ic_products',
            path: 'Description/lanehub_product'
          },
          {
            name: '商业合作',
            icon: 'icon-download_ic_cooperat',
            path: 'Description/partners'
          },
          {
            name: '加入我们',
            icon: 'icon-download_ic_join',
            path: 'Description/joinus'
          }
        ],
        navpopup: false
      };
    },
    methods: {
      skip(path){
        let that = this;
        if(that.$route.path.substr(1) === path) that.navpopup = false;
        that.assign(path);
      }
    },
    watch: {
      $route(){
        this.navpopup = false;
      },
      navpopup(cur) {
        if(cur) {
          // 阻止冒泡
          this.$el.querySelector('.menu-nav').addEventListener('touchmove', (e) => {
            e.preventDefault ? e.preventDefault() : window.event.returnValue = false;
          });
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .life-style {
    .menu-header {
      box-sizing: border-box;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 0 0.3rem;
      height: 1rem;
      z-index: 2100 !important;
      border: {
        top: 0.01rem solid $borderColor;
        bottom: 0.01rem solid $borderColor;
      }
      background-color: #fbfbfb;
      h1 {
        display: flex;
        align-items: center;
        i {
          font-size: 0.42rem;
          font-style: normal;
          font-weight: 300;
          color: $darkBlue;
        }
        span {
          font-size: 0.4rem;
          line-height: 0.4rem;
          font-weight: 400;
          color: $darkBlue;
        }
      }
      div {
        display: flex;
        align-items: center;
        a {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 1.68rem;
          height: 0.6rem;
          @include thin-line(#0072DD, 30px);
          font-size: 0.32rem;
          color: $darkBlue;
          margin-right: 0.2rem;
        }
        i {
          font-size: 0.42rem;
          color: rgba(190, 190, 190, 1);
        }
      }
    }
    .mint-popup {
      position: absolute;
      top: 1rem;
      width: 7.5rem;
      .menu-nav {
        padding: 0 0.4rem;
        top: 0.99rem;
        a {
          display: flex;
          align-items: center;
          height: 1.16rem;
          border-bottom: 0.01rem solid $borderColor;
          &:last-child {
            border: none;
          }
          i {
            font-size: 0.38rem;
            color: rgba(190, 190, 190, 1);
          }
          span {
            font-size: 0.36rem;
            color: $themeColor;
            margin-left: 0.3rem;
          }
        }
      }
    }
  }
</style>
