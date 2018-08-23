<template>
  <div class="life-style">
    <div class="menu-header">
      <img @click="skip('Choiceness')" src="../../../../static/app/svg/lifeStyle/download_ic_logo.svg" alt="">
      <p>
        <a href="javascript:;" @click="skip('Download')">下载 App</a>
        <img v-show="!navpopup" @click="navpopup = !navpopup" src="../../../../static/app/svg/lifeStyle/download_ic_menu.svg" alt="">
        <img v-show="navpopup" @click="navpopup = !navpopup" src="../../../../static/app/svg/lifeStyle/download_ic_close.svg" alt="">
      </p>
    </div>
    <mt-popup v-model="navpopup" position="top">
      <div class="menu-nav clearfix">
        <a href="javascript:;" v-for="(item,index) in menu" :key="index" @click="skip(item.router)">
          <img :src="item.img" alt="">
          <span>{{item.name}}</span>
        </a>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import home from '../../../../static/app/svg/lifeStyle/download_ic_home.svg';
  import about from '../../../../static/app/svg/lifeStyle/download_ic_bout-us.svg';
  import product from '../../../../static/app/svg/lifeStyle/download_ic_products.svg';
  import partners from '../../../../static/app/svg/lifeStyle/download_ic_cooperation.svg';

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

  .life-style{
    width: 7.5rem;
    position: relative;
    z-index: 2100;
    background-color: #fbfbfb;
    .menu-header{
      background-color: #fbfbfb;
      position: relative;
      z-index: 2100;
      width: 6.9rem;
      padding: 0 0.3rem;
      height: 0.98rem;
      display: flex!important;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid $borderColor;
      border-bottom: 1px solid $borderColor;
      >img{
        width: 0.76rem;
      }
      p{
        display: flex;
        align-items: center;
        img{
          width: 0.42rem;
        }
        a{
          font-size: 0.32rem;
          font-family: Helvetica;
          line-height: 0.32rem;
          color: $darkBlue;
          margin-right: 0.36rem;
        }
      }
    }
    .mint-popup{
      width: 7.5rem;
      height: 4.8rem;
      position: absolute;
      top: 1rem;
      .menu-nav{
        width: 6.7rem;
        padding: 0 0.4rem;
        top: 0.99rem;
        background: #fbfbfb;
        a{
          display: flex;
          align-items: center;
          position: relative;
          height: 1.16rem;
          border-bottom: 1px solid $borderColor;
          &:last-child{
            border: none;
          }
          img{
            float: left;
            width: 0.38rem;
          }
          span{
            float: left;
            font-size: 0.36rem;
            font-weight: 300;
            line-height: 0.36rem;
            color: $themeColor;
            margin-left: 0.3rem;
          }
        }
      }
    }
  }
</style>
