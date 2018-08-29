<template>
  <div class="life-style">
    <div class="menu-header">
      <h1>
        <img @click="skip('Choiceness')" src="../../../../static/mobile/svg/lifeStyle/download_ic_logo.svg" alt="">
      </h1>
      <div>
        <a href="javascript:;" @click="skip('Download')">下载 App</a>
        <img v-show="!navpopup" @click="navpopup = !navpopup" src="../../../../static/mobile/svg/lifeStyle/download_ic_menu.svg" alt="">
        <img v-show="navpopup" @click="navpopup = !navpopup" src="../../../../static/mobile/svg/lifeStyle/download_ic_close.svg" alt="">
      </div>
    </div>
    <mt-popup v-model="navpopup" position="top">
      <div class="menu-nav">
        <a href="javascript:;" v-for="(item,index) in menu" :key="index" @click="skip(item.router)">
          <img :src="item.img" alt="">
          <span>{{item.name}}</span>
        </a>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import home from '../../../../static/mobile/svg/lifeStyle/download_ic_home.svg';
  import about from '../../../../static/mobile/svg/lifeStyle/download_ic_bout-us.svg';
  import product from '../../../../static/mobile/svg/lifeStyle/download_ic_products.svg';
  import partners from '../../../../static/mobile/svg/lifeStyle/download_ic_cooperation.svg';

  export default {
    data(){
      return {
        menu: [
          {
            name: '首页',
            img: home,
            router: 'Choiceness'
          },
          {
            name: '关于瓴里',
            img: about,
            router: 'AboutUs'
          },
          {
            name: '瓴里产品',
            img: product,
            router: 'LaneHubProduct'
          },
          {
            name: '商业合作',
            img: partners,
            router: 'Partners'
          }
        ],
        navpopup: false
      };
    },
    methods: {
      skip(name){
        let that = this;
        if(that.$route.name === name) that.navpopup = false;
        that.$router.push({name});
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
      z-index: 2100;
      border: {
        top: 0.01rem solid $borderColor;
        bottom: 0.01rem solid $borderColor;
      }
      background-color: #fbfbfb;
      h1 {
        img {
          width: 0.76rem;
        }
      }
      div {
        display: flex;
        align-items: center;
        img {
          width: 0.42rem;
        }
        a {
          font-size: 0.32rem;
          font-family: Helvetica;
          color: $darkBlue;
          margin-right: 0.36rem;
        }
      }
    }
    .mint-popup {
      position: absolute;
      top: 1rem;
      width: 100%;
      height: 4.8rem;
      .menu-nav {
        padding: 0 0.4rem;
        top: 0.99rem;
        a {
          display: flex;
          align-items: center;
          height: 1.16rem;
          border-bottom: 1px solid $borderColor;
          &:last-child {
            border: none;
          }
          img {
            width: 0.38rem;
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
