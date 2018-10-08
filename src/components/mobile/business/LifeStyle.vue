<template>
  <div class="life-style">
    <div class="menu-header">
      <h1>
        <i v-if="$route.name !== 'ProductDetail' && $route.name !== 'ShopList'" @click="assign('life/choiceness')" class="iconfont icon-download_ic_logo"></i>
        <span v-else @click="assign('shop_list')">瓴里商城</span>
      </h1>
      <div>
        <a href="javascript:;" @click="assign('download')">下载 App</a>
        <i :class="'iconfont ' + (navpopup ? 'icon-download_ic_close' : 'icon-download_ic_menu')" @click="navpopup = !navpopup"></i>
      </div>
    </div>
    <mt-popup v-model="navpopup" position="top">
      <div class="menu-nav">
        <a href="javascript:;" v-for="(item,index) in menu" :key="index" @click="assign(item.path)">
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
        if(that.$route.path === path) that.navpopup = false;
        that.$router.push({path});
      }
    },
    watch: {
      $route(){
        this.navpopup = false;
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
          font-size: 0.32rem;
          font-family: Helvetica;
          color: $darkBlue;
          margin-right: 0.36rem;
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
