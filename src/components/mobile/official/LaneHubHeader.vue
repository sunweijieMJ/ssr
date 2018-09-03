<template>
  <div class="header" :class="{navpopup}">
    <div class="menu-header">
      <h1 @click="skip('Home')" :class="navpopup ? 'menu-header-logo-out' : 'menu-header-logo-in'">
        <img src="../../../../static/mobile/icon/nav_ic_logo_white_tw.png" alt="">
      </h1>
      <div class="menu-header-icon" @click="navpopup = !navpopup">
        <img v-show="!navpopup" src="../../../../static/mobile/icon/nav_ic_menu.png" alt="">
        <img v-show="navpopup" src="../../../../static/mobile/icon/nav_ic_close.png" alt="" style="width: 0.3rem">
      </div>
    </div>
    <mt-popup v-model="navpopup" position="top">
      <div class="menu-nav">
        <a href="javascript:;" v-for="(item,index) in menu" :key="index" @click="skip(item.router)">{{item.name}}</a>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        navpopup: false,
        menu: [
          {
            name: '首页',
            router: 'Home'
          },
          {
            name: '关于我们',
            router: 'AboutUs'
          },
          {
            name: '瓴里产品',
            router: 'LaneHubProduct'
          },
          {
            name: '商业合作',
            router: 'Partners'
          },
          {
            name: '加入我们',
            router: 'JoinUs'
          },
          {
            name: 'App 下载',
            router: 'LaneHubApp'
          }
        ]
      };
    },
    methods: {
      skip(name){
        let that = this;
        if(that.$route.name === name) that.navpopup = false;
        if(name === 'LaneHubApp'){
          this.download();
          return;
        }
        this.$router.push({name});
      },
      download(){
        let that = this;
        const u = window.navigator.userAgent;
        // iPhone or Android
        if((/MicroMessenger/i).test(u)){
          that.download_link = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.weihe.myhome';
        } else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
          that.download_link = 'https://download.lanehub.cn/android';
        } else if(u.indexOf('iPhone') > -1) {
          that.download_link = 'https://itunes.apple.com/cn/app/id1319173852?mt=8';
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .header {
    &.navpopup {
      background-color: rgba(0, 0, 0, 1);
    }
    box-sizing: border-box;
    position:fixed;
    top:0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    @include distance(0, (0 0.4rem));
    z-index: 3000;
    .menu-header {
      @include boxSize(100%, 1rem);
      @include flex(row, space-between);
      h1 {
        img {
          @include boxSize(1.6rem);
        }
      }
      .menu-header-icon {
        img {
          @include boxSize(0.43rem);
        }
      }
    }
    .mint-popup {
      position: absolute;
      top: 1rem;
      width: 100%;
      height: 20rem;
      background-color: #000;
      .menu-nav {
        padding: 0 0.4rem;
        top: 0.99rem;
        a {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 80%;
          height: 1.16rem;
          margin: 0 10%;
          font-size: 0.4rem;
          font-family: Helvetica;
          color: #fff;
          border-bottom: 1px solid hsla(0,0%,100%, 0.3);
        }
      }
    }
  }

  /* logo入场动画 */
  @keyframes in-logo{
    0%{
      -webkit-transform:translateX(-2.5rem);
    }
    100%{
      -webkit-transform:translateX(0);
    }
  }

  /* logo出场动画 */
  @keyframes out-logo{
    0%{
      -webkit-transform:translateX(0);
    }
    100%{
      -webkit-transform:translateX(-2.5rem);
    }
  }

  .menu-header-logo-in{
    -webkit-animation-name:in-logo;
    -webkit-animation-duration:0.5s;
    -webkit-animation-fill-mode:forwards;
  }
  .menu-header-logo-out{
    -webkit-animation-name:out-logo;
    -webkit-animation-duration:0.5s;
    -webkit-animation-fill-mode:forwards;
  }
</style>

